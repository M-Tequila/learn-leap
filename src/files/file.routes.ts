import { Router } from "express";
import FileController from "./file.controller";
import FileUploadValidators from "./middlewares/file-uploads-validators";
import multer, { Multer } from "multer";
import FileService from "./file.service";

export class FilesRoutes {
  private readonly fileController = new FileController();
  private readonly fileUploadsValidators = new FileUploadValidators();
  private readonly router: Router;
  private fileService = new FileService();
  constructor() {
    this.router = Router();
    this.setUpRoutes();
  }

  /**
   * setUpRoutes
   */

  public setUpRoutes(): void {
    this.router.post(
      "/upload-single",
      this.fileService.uploadSingle("file"),
      this.fileController.uploadSingleFile
    );
  }

  public NAMESPACE = "/files";
  public getRouter(): Router {
    return this.router;
  }
}
