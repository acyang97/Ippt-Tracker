import express, { Request, Response } from "express";
import { LoginUserDto } from "../dto/user.dto";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { loginUser } from "../services/auth.service";
import { auth } from "../middleware/auth";
import UserModel from "../models/User.schema";
import { UserDoc } from "../interfaces/user.interface";
import { AuthError } from "../interfaces/erros.interface";

const router = express.Router();

interface UserAuthRequest extends Request {
  user: UserDoc;
}
// @route  GET ippt-tracker/auth;
// @desc   TEST route
// @access private
// put middle ware as second argument
router.get("/", auth, async (req: UserAuthRequest, res: Response) => {
  try {
    // protected route
    const user = await UserModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route  POST ippt-tracker/auth
// @desc   Authenticate user & get token
// @access public
router.post(
  "/",
  async (
    req: Request,
    res: Response
  ): Promise<Response<{ token: string } | AuthError>> => {
    const { body } = req;
    const { error } = await validateAndConvert(LoginUserDto, body);
    if (error) {
      console.log(error);
      return res.status(400).send(error);
    }
    await loginUser(req, res);
  }
);

export default router;
