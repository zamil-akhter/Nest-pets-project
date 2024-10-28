import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  emailotp: number;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsBoolean()
  @IsOptional()
  isLocationSet?: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LogInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  repeatNewPassword: string;
}
