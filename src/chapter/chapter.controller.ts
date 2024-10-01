import { Request, Response, NextFunction } from "express";
import ChapterService from "./chapter.service";

export default class ChaptersController {
  private chapterService: ChapterService;
  constructor() {
    this.chapterService = new ChapterService();
  }

  createChapter = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.chapterService.create(request.body);
      return response.status(201).json({
        message: "Successfully created chapter",
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  deleteChapter = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await this.chapterService.deleteById(request.params.id);
      return response.status(200).json({
        message: "Successfully deleted chapter",
      });
    } catch (error) {
      next(error);
    }
  };

  getChapterById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.chapterService.getById(request.params.id);
      return response.status(200).json({
        message: "Successfully fetched chapter",
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getAllChaptersForCourse = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.chapterService.getAllCoursesByCourseId(request.params.id);
      return response.status(200).json({
        message: "Successfully fetched all chapters",
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
