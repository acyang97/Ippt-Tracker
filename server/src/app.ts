import express, { Application, NextFunction, Request, Response } from "express";
import { connectDB } from "../config/db";
import userRoutes from "./controllers/user.controller";

// import connect to db

const app: Application = express();

connectDB();

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

app.use("/ippt-tracker/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log("server running"));
