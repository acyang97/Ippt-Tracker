import express, { Request, Response } from "express";
import { TrainingSessionModel } from "../models/TrainingSession.schema";
import { auth } from "../middleware/auth";
import UserModel from "../models/User.schema";
import { UserDoc } from "../interfaces/user.interface";
import { TrainingSession } from "../interfaces/trainingSession.interface";
import { validateAndConvert } from "../middleware/validateAndConvert";
import { CreateTrainingSessionDto } from "../dto/trainingSession.dto";
import { GeneralError } from "../interfaces/erros.interface";
import { converDtoErrorToGeneralError } from "../utils/convertDtoErrorToGeneralError";
const router = express.Router();

// @route  GET ippt-tracker/training-session;
// @desc   GET all the training sessions by everyone
// @access private
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    // in future, wiil need to filter such taht only friends can see this
    const trainingSessions = await TrainingSessionModel.find().sort({
      date: -1,
    });
    res.json(trainingSessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

interface UserRequest extends Request {
  user: UserDoc;
}

interface GetOwnTrainingsResponse extends Response {
  trainingSessions: TrainingSession[];
}

// to get the user's
router.get(
  "/me",
  auth,
  async (req: UserRequest, res: GetOwnTrainingsResponse) => {
    try {
      const trainingSessions = await TrainingSessionModel.find({
        userId: req.user.id,
      }).sort({
        date: -1,
      });
      res.json(trainingSessions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

router.post("/create", auth, async (req: UserRequest, res: Response) => {
  // I need to get the pushUps, sitUps and run timing
  try {
    const { body } = req;
    const { error } = await validateAndConvert(CreateTrainingSessionDto, body);
    if (error) {
      const generalError: GeneralError = converDtoErrorToGeneralError(error);
      return res.status(400).json(generalError);
    }
    // perform logic to create the training session
    const { pushUps, sitUps, run } = body;
    const newTrainingSession = new TrainingSessionModel({
      userId: req.user.id,
      pushUps,
      sitUps,
      run,
      likes: [],
      comments: [],
    });

    const trainingSession: TrainingSession = await newTrainingSession.save();
    res.json(trainingSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
