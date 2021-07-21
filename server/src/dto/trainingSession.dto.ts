import { IsDefined, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateTrainingSessionDto {
  @IsInt()
  @IsPositive()
  @IsDefined()
  pushUps: Number;

  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  sitUps: Number;

  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  run: Number;
}
