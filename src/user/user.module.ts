import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userSchema, User } from './schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseHandler } from 'src/common/helper/responseHandler';
import { CommonHelper } from 'src/common/helper/commonHelper';
import { SendEmail } from '../common/utils/sendEmail';
import { emailWithOtpSchema, EmailWithOtp } from './schemas/emailOtpSchemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: EmailWithOtp.name, schema: emailWithOtpSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, ResponseHandler, CommonHelper, SendEmail],
})
export class UserModule {}
