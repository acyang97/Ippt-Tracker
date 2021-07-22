import { Schema, model } from "mongoose";
import { FollowersDoc } from "../interfaces/followers.interface";

const followersSchema = new Schema<FollowersDoc>({
  userId: { type: String },
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const FollowersModel = model<FollowersDoc>("Followers", followersSchema);

export default FollowersModel;
