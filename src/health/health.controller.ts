import { Request, Response, NextFunction } from "express";
export default class HealthController {
  testPost = (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json({
      message: "Health check for POST request was successful",
      data: request.body,
    });
  };

  testGet = (request: Request, response: Response, next: NextFunction) =>{
    return response.status(200).json({
        message: `Health check for GET request was successful`
    })
  }
}
