import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: String;

  @IsInt()
  @IsPositive()
  @IsDefined()
  age: Number;

  @MinLength(6)
  @IsDefined()
  @IsNotEmpty()
  password: String;

  @MinLength(6)
  @IsDefined()
  @IsNotEmpty()
  confirmPassword: String;
}

export class LoginUserDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: String;

  @MinLength(6)
  @IsDefined()
  @IsNotEmpty()
  password: String;
}
