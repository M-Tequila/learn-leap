import { StatusCodes } from "http-status-codes";
import HttpException from "./base-http-exception";

export class BadRequestError extends HttpException {
  status: number;
  message: string;

  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
    this.status = StatusCodes.BAD_REQUEST;
    this.message = message;
  }
}
