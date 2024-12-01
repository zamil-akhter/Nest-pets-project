import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The OTP sent to the user\'s email for verification',
    example: 123456,
  })
  @IsNumber()
  emailotp: number;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'The gender of the user',
    example: 'male',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({
    description: 'Flag indicating whether the user has set their location',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isLocationSet?: boolean;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LogInDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The old password of the user',
    example: 'oldpassword123',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'The new password for the user account',
    example: 'newpassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({
    description: 'Repeat the new password for confirmation',
    example: 'newpassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  repeatNewPassword: string;
}
