import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { FileType } from "../schema/file";

export default class FileUploadValidators {
  singleFileUploadValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Please atach a file to you request",
      });
    }
    const schema = Joi.object({
      type: Joi.string().valid(
        FileType.AUDIO,
        FileType.IMAGE,
        FileType.VIDEO,
        FileType.DOCUMENT
      ),
    });
  };
}
