import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class EmailWithOtp {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  otp: number;

  @Prop({ type: Date, default: new Date(Date.now()+24*60*60*1000) })
  otpExpireDate: number;
}

export const emailWithOtpSchema = SchemaFactory.createForClass(EmailWithOtp);