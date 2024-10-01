// Enroll in a course (courseId,userId,paid??)
// Get list of enrolled courses (along with their progress) (course,currentchapter, progress = current-chapter/total-chpaters)
// Delete a course a user enrolled in
//  Update a user's progress

import { Router } from "express";
import EnrollmentsController from "./enrollments.controller";
import authMiddleware from "../middlewares/auth";
import studentMiddleware from "../middlewares/student_middleware";

export class EnrollmentsRoutes {
  private enrollmentsController: EnrollmentsController;
  private router: Router;

  constructor() {
    this.enrollmentsController = new EnrollmentsController();
    this.router = Router();
    this.setUpRoutes();
  }

  private setUpRoutes = () => {
    this.router.post(
      "/enroll",
      // Validators for body
      authMiddleware,
      studentMiddleware,
      this.enrollmentsController.enroll
    );

    this.router.get(
      "/all",
      authMiddleware,
      studentMiddleware,
      this.enrollmentsController.getAllEnrollments
    );
    this.router.delete(
      "/:id",
      //   this.chapterValidators.validateSingleChapterRequest,
      authMiddleware,
      studentMiddleware,
      this.enrollmentsController.cancelEnrollment
    );
  };

  public NAMESPACE = "/enrollments";
  public getRouter(): Router {
    return this.router;
  }
}
