import express, {
  Express,
  Router,
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import AuthRoutes from "./auth/auth.routes";
import CourseRoutes from "./course/course.routes";
import errorMiddleware from "./middlewares/error_handler";
import authMiddleware from "./middlewares/auth";
import ChapterRoutes from "./chapter/chapter.routes";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger-docs";
import HealthRoutes from "./health/health.routes";
import { EnrollmentsRoutes } from "./enrollments/enrollments.routes";
import * as AWS from "aws-sdk";
import { FilesRoutes } from "./files/file.routes";
import CommentsRoutes from "./comments/comments.routes";

export default class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupRoutes(): void {
    const router = Router();
    const authRoutes = new AuthRoutes();
    const courseRoutes = new CourseRoutes();
    const chapterRoutes = new ChapterRoutes();
    const healthRoutes = new HealthRoutes();
    const enrollmentsRoutes = new EnrollmentsRoutes();
    const filesRoutes = new FilesRoutes();
    const commentsRoutes = new CommentsRoutes();
    router.use(authRoutes.NAMESPACE, authRoutes.getRouter());
    router.use(courseRoutes.NAMESPACE, courseRoutes.getRouter());
    router.use(chapterRoutes.NAMESPACE, chapterRoutes.getRouter());
    router.use(healthRoutes.NAMESPACE, healthRoutes.getRouter());
    router.use(enrollmentsRoutes.NAMESPACE, enrollmentsRoutes.getRouter());
    router.use(filesRoutes.NAMESPACE, filesRoutes.getRouter());
    router.use(commentsRoutes.NAMESPACE, commentsRoutes.getRouter());
    this.app.get("/whoami", authMiddleware, (req: Request, res: Response) => {
      return res.status(200).json({
        data: req.user,
      });
    });
    this.app.use("/api", router);
  }

  private setupMiddlewares(): void {
    // Parse JSON data
    this.app.use(express.json());
    this.app.use("/documentation", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private setupErrorHandling() {
    this.app.use(errorMiddleware);
    // Middleware for handling not found routes
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error("Not Found");
      res.status(404).json({ error: "Route not found" });
    });
  }
  public getApp(): Application {
    return this.app;
  }
}
