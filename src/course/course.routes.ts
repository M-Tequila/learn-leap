import { Router } from "express";
import "express-async-errors";
import CourseController from "./course.controller";
import CourseValidators from "./middlewares/course_validations";
import authMiddleware from "../middlewares/auth";
import creatorMiddleware from "../middlewares/creator_middleware";
import FileService from "../files/file.service";

export default class CourseRoutes {
  private readonly courseController = new CourseController();
  private readonly router: Router;
  private courseValidators = new CourseValidators();
  private filesService = new FileService();

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }
  private setupRoutes(): void {
    this.router.post(
      "/create",
      // this.courseValidators.validateCreateCourseRequest,
      authMiddleware,
      creatorMiddleware,
      this.filesService.uploadForCourse(),
      this.courseController.createCourse
    );

    this.router.get(
      "/:id",
      this.courseValidators.validateGetSingleCourseRequest,
      authMiddleware,
      this.courseController.getSingleCourseById
    );
    this.router.delete(
      "/:id",
      this.courseValidators.validateGetSingleCourseRequest,
      authMiddleware,
      this.courseController.deleteCourse
    );
    this.router.get(
      "/instructor/:id",
      this.courseValidators.validateGetSingleCourseRequest,
      authMiddleware,
      this.courseController.getAllCoursesByInstructor
    );
    this.router.get("/", authMiddleware, this.courseController.getAllCourses);
    this.router.get("/:type", authMiddleware, this.courseController.getCourseByType);
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/course";
}
