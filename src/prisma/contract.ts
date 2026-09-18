import { defineContract, enumType, member } from '@prisma/orm-postgres/contract-builder';

const TokenTypes = enumType(
  'TokenTypes',
  { codecId: 'pg/text@1', nativeType: 'text' } as const,
  member('ACCESS', 'access'),
  member('REFRESH', 'refresh'),
  member('RESET_PASSWORD', 'resetPassword'),
  member('VERIFY_EMAIL', 'verifyEmail')
);

export const contract = defineContract({}, ({ field, model, rel }) => {
  const UserStatus = model('UserStatus', {
    fields: {
      id: field.id.uuidv7String(),
      name: field.text().unique(),
      status: field.boolean(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const MeasurementUnit = model('MeasurementUnit', {
    fields: {
      id: field.id.uuidv7String(),
      unit: field.text().unique(),
      status: field.boolean(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const Sysconf = model('Sysconf', {
    fields: {
      id: field.id.uuidv7String(),
      sysconf: field.text().unique(),
      valueconf: field.text(),
      status: field.boolean(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const User = model('User', {
    fields: {
      id: field.id.uuidv7String(),
      email: field.text().unique(),
      password: field.text(),
      name: field.text().optional(),
      height: field.decimal().optional(),
      weight: field.decimal().optional(),
      statusId: field.uuidString(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
      deletedAt: field.temporal.timestamp().optional(),
    },
  });

  const Workout = model('Workout', {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      name: field.text(),
      description: field.text().optional(),
      bgColor: field.json(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
    },
  });

  const Exercise = model('Exercise', {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      workoutId: field.uuidString(),
      name: field.text(),
      sets: field.int(),
      reps: field.int(),
      measurementUnitId: field.uuidString(),
      equipment: field.text().optional(),
      restTime: field.int().optional(),
      image: field.text().optional(),
      youtubeLink: field.text().optional(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
    },
  });

  const WorkoutSession = model('WorkoutSession', {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      workoutId: field.uuidString(),
      startedAt: field.temporal.timestamp(),
      endedAt: field.temporal.timestamp().optional(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
    },
  });

  const PersonalAccessToken = model('PersonalAccessToken', {
    fields: {
      id: field.id.uuidv7String(),
      token: field.text(),
      userId: field.uuidString(),
      type: field.namedType(TokenTypes),
      expiresAt: field.dateTime(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
    },
  });

  return {
    models: {
      UserStatus: UserStatus.relations({
        user: rel.hasMany(User, { by: 'statusId' }),
      }),
      User: User.relations({
        status: rel.belongsTo(UserStatus, { from: 'statusId', to: 'id' }),
      }),
      MeasurementUnit: MeasurementUnit.relations({
        exercises: rel.hasMany(Exercise, { by: 'measurementUnitId' }),
      }),
      Workout: Workout.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
        exercises: rel.hasMany(Exercise, { by: 'workoutId' }),
      }),
      Exercise: Exercise.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
        workout: rel.belongsTo(Workout, { from: 'workoutId', to: 'id' }),
        measurementUnit: rel.belongsTo(MeasurementUnit, { from: 'measurementUnitId', to: 'id' }),
      }),
      WorkoutSession: WorkoutSession.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
        workout: rel.belongsTo(Workout, { from: 'workoutId', to: 'id' }),
      }),
      Sysconf: Sysconf.relations({}),
      PersonalAccessToken: PersonalAccessToken.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
      }),
    },
  };
});
