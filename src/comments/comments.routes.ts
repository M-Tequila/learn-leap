import { Router } from "express";
import "express-async-errors";
import CommentsController from "./comments.controller";
import authMiddleware from "../middlewares/auth";

export default class CommentsRoutes {
  private commentsController = new CommentsController();
  private readonly router: Router;
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post(
      "/create",
      authMiddleware,
      this.commentsController.create
    );

    this.router.delete("/:id", authMiddleware, this.commentsController.delete);
    this.router.get("/all/:id", authMiddleware, this.commentsController.getAll);
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/comments";
}
