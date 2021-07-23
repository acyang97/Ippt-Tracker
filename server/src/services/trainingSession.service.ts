import { TrainingSessionModel } from "../models/TrainingSession.schema";
import {
  HydratedTrainingSession,
  TrainingSession,
} from "../interfaces/trainingSession.interface";
import { User } from "../interfaces/user.interface";
import { findUserById } from "./user.service";

export const getAllTrainingSessions = async (): Promise<
  HydratedTrainingSession[]
> => {
  // in future, wiil need to filter such taht only friends can see this
  const trainingSessions = await TrainingSessionModel.find()
    .sort({
      date: -1,
    })
    .lean()
    .exec();
  const trainingSessionsAndUserInfo: HydratedTrainingSession[] =
    await Promise.all(
      trainingSessions.map(async (session) => {
        const userId = session.userId;
        const { name, email, age } = await findUserById(userId);
        return {
          ...session,
          name,
          email,
          age,
        };
      })
    );
  // console.log(trainingSessionsAndUserInfo);

  trainingSessionsAndUserInfo.sort((sessionA, sessionB) => {
    if (sessionA.date < sessionB.date) {
      return 1;
    } else if (sessionA.date > sessionB.date) {
      return -1;
    }
    return 0;
  });
  return trainingSessionsAndUserInfo;
};

export const likeTrainingSessionByUser = async (
  trainingSessionId: string,
  userId: string
): Promise<TrainingSession> => {
  const user: User = await findUserById(userId);
  const updatedTrainingSession = await TrainingSessionModel.findOneAndUpdate(
    { _id: trainingSessionId },
    { $push: { likes: user } },
    { new: true }
  )
    .lean()
    .exec();
  return updatedTrainingSession;
};
