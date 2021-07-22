import { Response } from "express";
import UserModel from "../models/User.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { User } from "../interfaces/user.interface";

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

    await user.save();

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

export const findUsers = (userId: string): Promise<User[]> => {
  return UserModel.find({
    // don't want to return own user
    _id: { $ne: userId },
  })
    .sort({ name: 1 })
    .lean()
    .exec();
};

// Need to update the schema to do this thing
export const followUser = (ownUserId: string, userToFollowUserId: string) => {};
