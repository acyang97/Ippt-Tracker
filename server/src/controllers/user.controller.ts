import express, { Request, Response } from "express";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { CreateUserDto } from "../dto/user.dto";
import { createUser, findUsers } from "../services/user.service";
import { GeneralError } from "../interfaces/erros.interface";
import { converDtoErrorToGeneralError } from "../utils/convertDtoErrorToGeneralError";
import { auth } from "../middleware/auth";
import { UserAuthRequest } from "../interfaces/user.interface";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  const { error } = await validateAndConvert(CreateUserDto, body);
  console.log(error);
  if (error) {
    const generalError: GeneralError = converDtoErrorToGeneralError(error);
    return res.status(400).json(generalError);
  }
  const { name, email, password, confirmPassword, age } = body;
  await createUser(name, email, password, confirmPassword, age, res);
});

router.get("/", auth, async (req: UserAuthRequest, res: Response) => {
  try {
    const users = await findUsers(req.user.id);
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ message: "Server error" }] });
  }
});

export default router;
