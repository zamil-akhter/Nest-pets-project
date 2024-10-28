import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({
    type: String,
    enum: ['male', 'female', 'other'],
    default: null,
  })
  gender: string;

  @Prop({ type: Boolean, default: false })
  isLocationSet: boolean;

  @Prop({ required: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);