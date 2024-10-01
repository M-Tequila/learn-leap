import { Request, Response, NextFunction } from "express";
import EnrollmentsService from "./enrollments.service";

export default class EnrollmentsController {
  enrollmentsService: EnrollmentsService;
  constructor() {
    this.enrollmentsService = new EnrollmentsService();
  }

  enroll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await this.enrollmentsService.createEnrollment(
        request.body.courseId,
        request.user!.id
      );
      return response.status(201).json({
        message: "Successfully enrolled for this course",
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  cancelEnrollment = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      console.log(`CourseID to be deleted: ${request.params.id}`)
      const result = await this.enrollmentsService.cancelEnrollment(
        request.params.id,
        request.user!.id
      );
      return response.status(200).json({
        message: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllEnrollments = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.enrollmentsService.getAllEnrollments(
        request.user!.id
      );
      return response.status(200).json({
        message: "Successfully fetched all Enrollments.",
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
