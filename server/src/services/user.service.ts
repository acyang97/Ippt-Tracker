import { Response } from "express";
import UserModel from "../models/User.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

export const createUser = async (
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  age: Number,
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
