import FollowersModel from "../models/Followers.schema";
import { Response } from "express";
import { Followers } from "../interfaces/followers.interface";
import { User } from "../interfaces/user.interface";

export const createNewFollowersDocOnUserRegister = async (
  userId: string,
  res: Response
) => {
  try {
    const newFollowersDoc = new FollowersModel({ userId, followers: [] });
    await newFollowersDoc.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ message: "Server error" }] });
  }
};

export const getFollowersListByUserId = async (
  userId: string
): Promise<Followers> => {
  return FollowersModel.findOne({ userId }).lean().exec();
};

export const addNewUserToFollowersList = async (
  userId: string,
  newFollower: User
): Promise<void> => {
  await FollowersModel.findOneAndUpdate(
    { userId },
    { $push: { followers: newFollower } }
  )
    .lean()
    .exec();
};

export const removeUserFromFollowersList = async (
  userId: string,
  userThatUnfollowed: User
): Promise<void> => {
  await FollowersModel.findOneAndUpdate(
    { userId },
    {
      $pull: { followers: { $elemMatch: { email: userThatUnfollowed.email } } },
    }
  )
    .lean()
    .exec();
};
