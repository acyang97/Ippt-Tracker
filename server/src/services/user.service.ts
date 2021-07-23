import { Response } from "express";
import UserModel from "../models/User.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { User, UserDoc } from "../interfaces/user.interface";
import {
  addNewUserToFollowingList,
  createNewFollowingDocOnUserRegister,
  getFollowingListByUserId,
  removeUserToFollowingList,
} from "./following.service";
import {
  addNewUserToFollowersList,
  createNewFollowersDocOnUserRegister,
  getFollowersListByUserId,
  removeUserFromFollowersList,
} from "./followers.service";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  age: number,
  res: Response
) => {
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: "User already exists" }] });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        errors: [
          { message: "Please make sure that the passwords are the same" },
        ],
      });
    }
    user = new UserModel({ name, email, age, password });
    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password.toString(), salt);

    const createdUser = await user.save();
    await createNewFollowingDocOnUserRegister(String(createdUser._id), res);
    await createNewFollowersDocOnUserRegister(String(createdUser._id), res);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token: String) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const findUserById = (userId: string): Promise<User> => {
  return UserModel.findById(userId).lean().exec();
};

export const findUsers = async (userId: string): Promise<any> => {
  const users: UserDoc[] = await UserModel.find({
    // don't want to return own user
    _id: { $ne: userId },
  }).sort({ name: 1 });
  let hydratedList: any = [];
  await Promise.all(
    users.map(async (user) => {
      const id = user._id;
      const followersListOfUser = await getFollowersListByUserId(String(id));
      const followingListOfUser = await getFollowingListByUserId(String(id));
      hydratedList.push({
        _id: user._id,
        name: user.name,
        age: user.age,
        email: user.email,
        followersListOfUser,
        followingListOfUser,
      });
    })
  );
  console.log("hydratedList", hydratedList);
  return hydratedList;
};

// Need to update the schema to do this thing
// export const followUser = async (
//   ownUserId: string,
//   userIdOfUserToFollow: string,
//   res: Response
// ) => {
//   const userToFollow = await findUserById(userIdOfUserToFollow);
//   const ownUser = await findUserById(ownUserId);
//   const listOfFollowers: User[] = userToFollow.followers;
//   if (listOfFollowers.find((user) => user.email === ownUser.email)) {
//     return res
//       .status(400)
//       .send({ errors: [{ message: `Already followed ${userToFollow.name}` }] });
//   }
//   if (ownUser.following.find((user) => user.email === userToFollow.email)) {
//     return res
//       .status(400)
//       .send({ errors: [{ message: `Already followed ${userToFollow.name}` }] });
//   }

//   let newFollowingForOwnUser = ownUser.following;
//   newFollowingForOwnUser.push(userToFollow);

//   const updatedOwnUser: User = await UserModel.findOneAndUpdate(
//     { _id: ownUserId },
//     {
//       $set: {
//         following: newFollowingForOwnUser,
//       },
//     },
//     { new: true }
//   );
//   console.log("here1");

//   let newFollowersForOtherUser = userToFollow.followers;
//   newFollowersForOtherUser.push(ownUser);
//   const updatedUserToFollow = await UserModel.findOneAndUpdate(
//     { _id: userIdOfUserToFollow },
//     {
//       $set: {
//         followers: newFollowersForOtherUser,
//       },
//     },
//     { new: true }
//   );
//   console.log("here2");
//   return {
//     updatedOwnUser,
//     updatedUserToFollow,
//   };
// };

export const followUser = async (
  ownUserId: string,
  userIdOfUserToFollow: string,
  res: Response
) => {
  const followersListOfUserToFollow = await getFollowersListByUserId(
    userIdOfUserToFollow
  );
  const followingListOfUser = await getFollowingListByUserId(ownUserId);
  const userToFollow = await findUserById(userIdOfUserToFollow);
  const ownUser = await findUserById(ownUserId);
  if (
    followersListOfUserToFollow.followers.find(
      (user) => user.email === ownUser.email
    )
  ) {
    return res
      .status(400)
      .send({ errors: [{ message: `Already followed ${userToFollow.name}` }] });
  }
  if (
    followingListOfUser.following.find(
      (user) => user.email === userToFollow.email
    )
  ) {
    return res
      .status(400)
      .send({ errors: [{ message: `Already followed ${userToFollow.name}` }] });
  }
  await addNewUserToFollowersList(userIdOfUserToFollow, ownUser);
  await addNewUserToFollowingList(ownUserId, userToFollow);
};

export const unfollowUser = async (
  ownUserId: string,
  userIdOfUserToUnfollow: string,
  res: Response
) => {
  const followersListOfUserToUnfollow = await getFollowersListByUserId(
    userIdOfUserToUnfollow
  );
  const followingListOfUser = await getFollowingListByUserId(ownUserId);
  const userToUnfollow = await findUserById(userIdOfUserToUnfollow);
  const ownUser = await findUserById(ownUserId);
  if (
    !followersListOfUserToUnfollow.followers.find(
      (user) => user.email === ownUser.email
    )
  ) {
    return res
      .status(400)
      .send({ errors: [{ message: `Never even follow this user, weird...` }] });
  }
  if (
    followingListOfUser.following.find(
      (user) => user.email === userToUnfollow.email
    )
  ) {
    return res
      .status(400)
      .send({ errors: [{ message: `Never even follow this user, weird...` }] });
  }
  await removeUserFromFollowersList(userIdOfUserToUnfollow, ownUser);
  await removeUserToFollowingList(ownUserId, userToUnfollow);
};
