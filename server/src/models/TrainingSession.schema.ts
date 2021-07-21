import { Schema, model } from "mongoose";
import { TrainingSession } from "../interfaces/trainingSession.interface";

const trainingSession = new Schema<TrainingSession>({
  userId: {
    type: String,
    required: true,
  },
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
  run: {
    type: Number,
    required: true,
  },
  ipptPoints: {
    sitUpsPoints: {
      type: Number,
    },
    pushUpsPoints: {
      type: Number,
    },
    runPoints: {
      type: Number,
    },
    totalPoints: {
      type: Number,
    },
    result: {
      type: String,
    },
  },
  // should track who likes this post too
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const TrainingSessionModel = model<TrainingSession>(
  "TrainingSession",
  trainingSession
);
