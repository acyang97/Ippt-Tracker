import FollowingModel from "../models/Following.schema";
import { Response } from "express";
import { Following } from "../interfaces/following.interface";
import { User } from "../interfaces/user.interface";

export const createNewFollowingDocOnUserRegister = async (
  userId: string,
  res: Response
) => {
  try {
    const newFollowingDoc = new FollowingModel({ userId, following: [] });
    await newFollowingDoc.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ message: "Server error" }] });
  }
};

export const getFollowingListByUserId = async (
  userId: string
): Promise<Following> => {
  return FollowingModel.findOne({ userId }).lean().exec();
};

export const addNewUserToFollowingList = async (
  userId: string,
  userToFollow: User
): Promise<void> => {
  await FollowingModel.findOneAndUpdate(
    { userId },
    { $push: { following: userToFollow } }
  )
    .lean()
    .exec();
};
