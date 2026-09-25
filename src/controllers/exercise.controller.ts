import { status as httpStatus } from 'http-status';
import type { Response } from 'express';
import ExerciceService from '../services/exercise.service.ts';
import type {
  GetExercisesType,
  ReqCreateExercise,
  ReqDeleteExercise,
} from '../types/exercise.type.ts';

const ExerciseController = {
  getAllExercises: async (req: GetExercisesType, res: Response) => {
    const exercises = await ExerciceService.getAllExercise({ workoutId: req.params.workoutId });
    res.status(httpStatus.OK).send({ exercises });
  },
  createExercise: async (req: ReqCreateExercise, res: Response) => {
    const exercise = await ExerciceService.createExercise({
      ...req.body,
      userId: req.user?.id || '',
    });
    res.status(httpStatus.CREATED).send({ exercise });
  },
  deleteExercise: async (req: ReqDeleteExercise, res: Response) => {
    await ExerciceService.deleteExercise({ ...req.body, userId: req.user?.id || '' });
    res.status(httpStatus.OK).send({ message: 'Exercise deleted successfully!' });
  },
};

export default ExerciseController;
