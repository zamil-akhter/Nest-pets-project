import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ResponseHandler } from 'src/common/helper/responseHandler';

@Injectable()
export class TokenAuthorization {
  constructor(
    private readonly responseHandler: ResponseHandler,
  ){}
  verifyToken (res) {
    try {
      // const authHeader = req.headers.authorization;
      // if (!authHeader) {
      //   return sendError(res, "Authorization header missing");
      // }
      // const token = authHeader.split(" ")[1];
      // if (!token) {
      //   return sendError(res, "Token is mising");
      // }
      // const user = jwt.verify(token, process.env.SECRET_KEY);
      // req.user = user;
    } catch (e) {
      return this.responseHandler.catchErrorResponse(res, e);
    }
  };
}







