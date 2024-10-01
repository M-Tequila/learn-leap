import { Router } from "express";
import HealthController from "./health.controller";

export default class HealthRoutes {
  private readonly router: Router;
  private readonly healthController: HealthController = new HealthController();

  constructor() {
    this.router = Router();

    this.setupRoutes();
  }
  setupRoutes() {
    this.router.post("/post", this.healthController.testPost);
    this.router.get("/get", this.healthController.testGet);
  }
  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/health";
}
