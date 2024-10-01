import FileService from "./file.service";
import { Request, Response, NextFunction } from "express";
import { FileType } from "./schema/file";
import logger from "../utils/logger";

export default class FileController {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  /**
   * uploadSingleFile
   */
  public uploadSingleFile = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      console.log(`File to be uploaded: ${request.file?.originalname}`)
      await this.fileService.uploadFile(request.file!, FileType.IMAGE);
      return response.status(200).json({
        message: "Successfully uploaded  file",
      });
    } catch (error) {
      console.log(`Error Uloading file: ${JSON.stringify(error)}`);
      next(error);
    }
  };
}
