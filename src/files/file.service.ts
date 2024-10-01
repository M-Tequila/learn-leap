import cloudinary from "cloudinary";
import * as AWS from "aws-sdk";
import File, { FileType, IFile } from "./schema/file";
import * as uuid from "uuid";
import logger from "../utils/logger";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";

import HttpException from "../errors/base-http-exception";

export default class FileService {
  private s3Client: S3Client = new S3Client();
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_KEY_SECRET!,
    });
  }

  private storage = multer.memoryStorage();
  private upload = multer({ storage: this.storage });

  public uploadSingle = (fieldName: string) => {
    return this.upload.single(fieldName);
  };

  public uploadForCourse = () => {
    return this.upload.array("files", 2);
  };

  saveFileMetadata() {}
  /**
   * Upload a file to cloudinary, and retrun the url
   */

  public uploadFile = async (
    file: Express.Multer.File,
    fileType: FileType
  ): Promise<IFile | null> => {
    const result = await cloudinary.v2.uploader.upload(file.path);
    console.log(`Result from uploaded file ::: ${result.url}`);
    return null;
  };
}
