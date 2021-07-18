import express, { Request, Response } from "express";
import { LoginUserDto } from "../dto/user.dto";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { loginUser } from "../services/auth.service";
import { auth } from "../middleware/auth";
import User from "../models/User.schema";
import { UserModel } from "../interfaces/user.interface";

const router = express.Router();

// @route  GET ippt-tracker/auth;
// @desc   TEST route
// @access public
// put middle ware as second argument
router.get(
  "/",
  auth,
  async (req: Request & { user: UserModel }, res: Response) => {
    try {
      // protected route
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route  POST ippt-tracker/auth
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
