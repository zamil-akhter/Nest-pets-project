import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ChangePasswordDto, LogInDto, SignUpDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Response } from 'express';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('sendOtp/:email')
  sendOtp(@Param('email') email: string, @Res() res : Response) {
    return this.userService.sendOtpOnMail(res, email);
  }

  @Post()
  signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    return this.userService.signUp(res, signUpDto);
  }

  @Post('logIn')
  logIn(@Body() logInDto : LogInDto, @Res() res: Response){
    return this.userService.logIn(res, logInDto)
  }

  @Patch('changePassword')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Res() res : Response){
    return this.userService.changePassword(res, changePasswordDto)
  }




  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
