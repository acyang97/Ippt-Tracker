import axios from "axios";

export const calculatePoints = async (
  pushUps: Number,
  sitUps: Number,
  run: Number,
  age: Number
): Promise<Number> => {
  const res = await axios.get(
    `https://ippt.vercel.app/api?age=${age}&situps=${sitUps}&pushups=${pushUps}&run=${run}`
  );
  const points: Number = res.data.total;
  return points;
};
