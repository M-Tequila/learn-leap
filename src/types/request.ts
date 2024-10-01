import { Request } from "express";
import { IUser } from "../user/schema/user";

export interface RequestWithUser extends Request {
  requestWithUser: Promise<IUser | null>;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
