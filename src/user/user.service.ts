import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ResponseHandler } from 'src/common/helper/responseHandler';
import { CommonHelper } from 'src/common/helper/commonHelper';
import { SendEmail } from '../common/utils/sendEmail';
import { EmailWithOtp } from './schemas/emailOtpSchemas';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(EmailWithOtp.name)
    private emailWithOtpModel: Model<EmailWithOtp>,
    private readonly responseHandler: ResponseHandler,
    private readonly commonHelper: CommonHelper,
    private readonly sendEmail: SendEmail,
  ) {}

  async sendOtpOnMail(res: any, email: any) {
    const otp = this.commonHelper.generateOtp();
    const otpMailOptions = {
      from: process.env.GMAILID,
      to: email,
      subject: `OTP for Signup ${otp}`,
      html: `
            <p>Dear user,</p>
            <p>${otp} is your one time password (OTP). Please do not share the OTP with others.</p>
            <p>Regards,<br>Team Backend</p>`,
    };

    const info = await this.sendEmail.sendEmail(otpMailOptions);

    await this.emailWithOtpModel.findOneAndUpdate(
      { email },
      {
        email,
        otp,
        otpExpireDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      { upsert: true },
    );
    return this.responseHandler.successResponse(res, 'Sent Otp successfully');
  }

  async signUp(res: any, signUpDto: any) {
    try {
      const isOtpMatch = await this.emailWithOtpModel.findOne({
        email: signUpDto.email,
        otp: signUpDto.emailotp,
      });

      if (!isOtpMatch) {
        return this.responseHandler.errorResponse(res, 'Otp is incorrect');
      }

      const currentDate = new Date();
      if (isOtpMatch.otpExpireDate.valueOf() < currentDate.valueOf()) {
        return this.responseHandler.errorResponse(res, 'Otp expired');
      }

      const existingUser = await this.userModel.findOne({
        email: signUpDto.email,
      });
      if (existingUser) {
        return this.responseHandler.errorResponse(res, 'User already exists');
      }

      signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
      this.userModel.create(signUpDto);
      return this.responseHandler.successResponse(
        res,
        'User created successfully',
      );
    } catch (e) {
      return this.responseHandler.catchErrorResponse(res, e);
    }
  }

  async logIn(res: any, logInDto: any) {
    const email = logInDto.email;
    const password = logInDto.password;

    const existingUser = await this.userModel.findOne({ email: email });
    if (!existingUser) {
      return this.responseHandler.unauthorizeErrorResponse(
        res,
        'Email does not exists',
      );
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return this.responseHandler.errorResponse(res, 'Password is incorrect');
    }

    const payload = {
      _id: existingUser._id,
      email,
      fullName: existingUser.fullName,
      phoneNumber: existingUser.phoneNumber,
    };
    const userToken = jwt.sign(payload, process.env.SECRET_KEY);

    return this.responseHandler.successResponseWithData(
      res,
      'Login successfull',
      userToken,
    );
  }

}
