import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from "class-validator";

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
