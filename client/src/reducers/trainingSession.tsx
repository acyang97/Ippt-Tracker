import { TrainingSessionActionTypes } from "../action-types/trainingSession.action-types";
import { ITrainingSession } from "../interfaces/TrainingSession.interface";

export interface TrainingSessionsState {
  trainingSessions: ITrainingSession[];
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
    default:
      return state;
  }
}

export default TrainingSessionReducer;
