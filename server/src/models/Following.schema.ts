import { Schema, model } from "mongoose";
import { FollowingDoc } from "../interfaces/following.interface";

const followingSchema = new Schema<FollowingDoc>({
  userId: { type: String },
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const FollowingModel = model<FollowingDoc>("Following", followingSchema);

export default FollowingModel;
