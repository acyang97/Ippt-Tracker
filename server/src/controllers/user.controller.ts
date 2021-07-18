import express, { Request, Response } from "express";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { CreateUserDto } from "../dto/user.dto";
import { createUser } from "../services/user.service";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  const { error } = await validateAndConvert(CreateUserDto, body);
  if (error) {
    return res.status(400).send(error);
  }
  const { name, email, password, confirmPassword, age } = body;
  await createUser(name, email, password, confirmPassword, age, res);
});

export default router;
