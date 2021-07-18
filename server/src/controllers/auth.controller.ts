import express, { Request, Response } from "express";
import User from "../models/User.schema";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";
import { LoginUserDto } from "../dto/user.dto";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { loginUser } from "../services/auth.service";

const router = express.Router();

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access public
router.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  const { error } = await validateAndConvert(LoginUserDto, body);
  if (error) {
    return res.status(400).send(error);
  }
  await loginUser(req, res);
});

export default router;
