import { Response } from "express";
import User from "../models/User.schema";

export const createUser = async (
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  age: Number,
  res: Response
) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        errors: [{ msg: "Please make sure that the passwords are the same" }],
      });
    }
    user = new User({ name, email, age, password });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
