import { TrainingSessionActionTypes } from "../action-types/trainingSession.action-types";

export interface CreateTrainingAction {
  type: TrainingSessionActionTypes.CREATE_TRAINING;
}

export interface CreateTrainingSuccessAction {
  type: TrainingSessionActionTypes.CREATE_TRAINING_SUCCESS;
}

export interface CreateTrainingFailAction {
  type: TrainingSessionActionTypes.CREATE_TRAINING_FAIL;
}
