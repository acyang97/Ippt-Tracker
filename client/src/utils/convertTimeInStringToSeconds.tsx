export const convertTimeInStringToSecond = (timeInSeconds: string): number => {
  const [minInString, secInString] = timeInSeconds.split(":");
  return Number(minInString) * 60 + Number(secInString);
};
