import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHandler {
  successResponse(res: any, msg: string) {
    return res.status(200).json({statusCode: 200,message: msg,});
  }

  successResponseWithData(res: any, msg: string, responseData : any){
    return res.status(200).json({statusCode: 200,message: msg,data: responseData});
  }

  errorResponse(res: any, msg: string) {
    return res.status(400).json({statusCode: 400,message: msg,});
  }

  unauthorizeErrorResponse(res: any, msg: string) {
    return res.status(401).json({statusCode: 401,message: msg});
  }

  catchErrorResponse(res: any, error: string) {
    return res.status(500).json({statusCode: 500,error: error});
  }
}
