import express, { Application, NextFunction, Request, Response } from "express";
import { connectDB } from "../config/db";
import userRoutes from "./controllers/user.controller";
import authRoutes from "./controllers/auth.controller";

// import connect to db

const app: Application = express();

connectDB();

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

app.use("/ippt-tracker/users", userRoutes);
app.use("/ippt-tracker/auth", authRoutes);
app.use("/ippt-tracker/training-session", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server running"));
