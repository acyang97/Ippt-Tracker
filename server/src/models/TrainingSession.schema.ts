import { Schema, model } from "mongoose";

const trainingSession = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  pushUps: {
    type: Number,
    required: true,
  },
  sitUps: {
    type: Number,
    required: true,
  },
  // should calculate the seconds. Idea will be that in frontend, user types in the minutes
  // then we conver it to seconds for easier calculations
  // Might have a better solution but think about it later
  "2.4km": {
    type: Number,
    required: true,
  },
});

const TrainingSession = model("TrainingSession", trainingSession);

export default TrainingSession;
