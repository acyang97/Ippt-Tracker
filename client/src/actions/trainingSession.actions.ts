import { TrainingSessionActionTypes } from "../action-types/trainingSession.action-types";

export interface InitLoadTrainingsSuccessAction {
  type: TrainingSessionActionTypes.INIT_LOAD_TRAININGS_SUCCESS;
  payload: any; //TODO: add the specific type later
}

export interface InitLoadTrainingsFailAction {
  type: TrainingSessionActionTypes.INIT_LOAD_TRAININGS_FAIL;
}

export interface CreateTrainingAction {
  type: TrainingSessionActionTypes.CREATE_TRAINING;
}

export interface CreateTrainingSuccessAction {
  type: TrainingSessionActionTypes.CREATE_TRAINING_SUCCESS;
}

export interface CreateTrainingFailAction {
  type: TrainingSessionActionTypes.CREATE_TRAINING_FAIL;
}
