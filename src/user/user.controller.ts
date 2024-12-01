import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
} from '@nestjs/common';
import { ChangePasswordDto, LogInDto, SignUpDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('sendOtp/:email')
  @ApiOperation({ summary: 'Send Otp on email' })
  @ApiResponse({ status: 200, description: 'Otp Sent' })
  sendOtp(@Param('email') email: string, @Res() res : Response) {
    return this.userService.sendOtpOnMail(res, email);
  }

  @Post('signUp')
  @ApiOperation({ summary: 'User singup' })
  @ApiResponse({ status: 200, description: 'Singup successfully' })
  signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    return this.userService.signUp(res, signUpDto);
  }

  @Post('logIn')
  logIn(@Body() logInDto : LogInDto, @Res() res: Response){
    return this.userService.logIn(res, logInDto)
  }
}
