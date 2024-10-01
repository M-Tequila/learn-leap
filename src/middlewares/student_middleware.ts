import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { RequestWithUser } from "../types/request";
import {
  
  ForbiddenRequestError,
  NotFoundRequestError,
  UnauthenticatedError,
} from "../errors";
import UsersService from "../user/services/user.service";
import { JWTPayload } from "../auth/auth.service";
import HttpException from "../errors/base-http-exception";

async function studentMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const requestWithUser = request as RequestWithUser;

  const authorizationHeader = requestWithUser.headers["authorization"];
  if (!authorizationHeader) {
    next(new UnauthenticatedError("No token found for this request"));
  }
  if (authorizationHeader && !authorizationHeader.startsWith("Bearer ")) {
    next(new UnauthenticatedError("No token found for this request"));
  }
  try {
    const userService = new UsersService();
    const auth = request.headers["authorization"];
    const token = auth!.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

    const user = await userService.getUserById(decoded.id);
    if (!user) {
      next(
        new NotFoundRequestError("Invalid Session, please login and try again.")
      );
    }
    if (user!.role === "student") {
      requestWithUser.user = user!;
      next();
    } else {
      next(new ForbiddenRequestError("access denied, only a student can perform this operation."));
    }
  } catch (error) {
    next(new HttpException(401, `${error}`));
  }
}

export default studentMiddleware;
