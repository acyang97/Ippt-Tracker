import axios from "axios";
import { IpptPoints } from "../interfaces/trainingSession.interface";
export const calculatePoints = async (
  pushUps: Number,
  sitUps: Number,
  run: Number,
  age: Number
): Promise<IpptPoints> => {
  const res = await axios.get(
    `https://ippt.vercel.app/api?age=${age}&situps=${sitUps}&pushups=${pushUps}&run=${run}`
  );
  const ipptPoints: IpptPoints = {
    sitUpsPoints: res.data.situps.score,
    pushUpsPoints: res.data.pushups.score,
    runPoints: res.data.run.score,
    totalPoints: res.data.total,
    result: res.data.result.name,
  };
  return ipptPoints;
};
