import { Request, Response } from "express";
import UserModel from "../models/User.schema";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";
import { UserDoc } from "../interfaces/user.interface";
import { AuthError } from "../interfaces/erros.interface";

// TODO: figure out how to make the return type
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response<{ token: string } | AuthError>> => {
  const { email, password } = req.body;
  try {
    // If user exists, send error
    let user: UserDoc = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password.toString());
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
