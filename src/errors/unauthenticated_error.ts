import HttpException from "./base-http-exception";

import { StatusCodes } from "http-status-codes";

export class UnauthenticatedError extends HttpException {
  status: number;
  message: string;

  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
    this.status = StatusCodes.UNAUTHORIZED;
    this.message = message;
  }
}
