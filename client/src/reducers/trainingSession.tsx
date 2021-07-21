import { TrainingSessionActionTypes } from "../action-types/trainingSession.action-types";
import { IHydratedTrainingSession } from "../interfaces/TrainingSession.interface";

export interface TrainingSessionsState {
  trainingSessions: IHydratedTrainingSession[];
}

// I want this to contain the list of errors
const initialState: TrainingSessionsState = {
  trainingSessions: [],
};

function TrainingSessionReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case TrainingSessionActionTypes.INIT_LOAD_TRAININGS_SUCCESS:
      return {
        ...state,
        trainingSessions: payload,
      };
    case TrainingSessionActionTypes.CREATE_TRAINING_SUCCESS:
      const { trainingSessions } = state;
      const updatedTrainingSessions = [...trainingSessions, payload];
      return {
        trainingSessions: updatedTrainingSessions,
      };
    default:
      return state;
  }
}

export default TrainingSessionReducer;
