import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { UserModel } from "../interfaces/user.interface";

const auth = (
  req: Request & { user: UserModel },
  res: Response,
  next: NextFunction
) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSecret")
    ) as jwt.JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export { auth };
