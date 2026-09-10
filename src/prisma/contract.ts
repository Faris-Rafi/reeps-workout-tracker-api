import { defineContract } from '@prisma/orm-postgres/contract-builder';

export const contract = defineContract({}, ({ field, model, rel }) => {
  const UserStatus = model('UserStatus', {
    fields: {
      id: field.id.uuidv7String(),
      status: field.text().unique(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const measurementUnit = model('Measurement_Unit', {
    fields: {
      id: field.id.uuidv7String(),
      unit: field.text().unique(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const User = model('User', {
    fields: {
      id: field.id.uuidv7String(),
      email: field.text().unique(),
      username: field.text().optional(),
      name: field.text().optional(),
      height: field.decimal().optional(),
      weight: field.decimal().optional(),
      statusId: field.uuidString(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
      deletedAt: field.temporal.timestamp().optional(),
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
      Measurement_Unit: measurementUnit.relations({}),
    },
  };
});
