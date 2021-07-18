import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { check, validationResult } from "express-validator";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { CreateUserDto } from "../dto/user.dto";
import { createUser } from "../services/user.service";

import User from "../models/User.schema";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("works");
});

router.post(
  "/",
  // [
  //   check("name", "Name is required").not().isEmpty(),
  //   check("email", "Please include a valid email").isEmail(),
  //   check(
  //     "password",
  //     "Please enter a password with 6 or more characters"
  //   ).isLength({ min: 6 }),
  // ],
  async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = await validateAndConvert(CreateUserDto, body);
    if (error) {
      return res.status(400).send(error);
    }
    const { name, email, password, confirmPassword, age } = body;
    await createUser(name, email, password, confirmPassword, age, res);
  }
);

export default router;
