import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonHelper {
    generateOtp(){
        let digits = "123456789";
        let OTP = "";
        let len = digits.length;
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * len)];
        }
        return OTP;
    }
}