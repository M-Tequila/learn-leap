import { StatusCodes } from "http-status-codes";
import HttpException from "./base-http-exception";

export class ForbiddenRequestError extends HttpException {
  status: number;
  message: string;

  constructor(message: string) {
    super(StatusCodes.FORBIDDEN, message);
    this.status = StatusCodes.FORBIDDEN;
    this.message = message;
  }
}
