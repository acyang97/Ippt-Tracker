import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { UserDoc } from "../interfaces/user.interface";
import { AuthError } from "../interfaces/erros.interface";

const auth = (
  req: Request & { user: UserDoc },
  res: Response,
  next: NextFunction
): Response<AuthError> | void => {
  // Get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ errors: [{ message: "No Auth token" }] });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSecret")
    ) as jwt.JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ message: "No Auth token" }] });
  }
};

export { auth };
