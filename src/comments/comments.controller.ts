import CommentService from "./comments.service";
import { Request, Response, NextFunction } from "express";
export default class CommentsController {
  private commentsService = new CommentService();

  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.commentsService.createComment(request.body);
      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.commentsService.deleteComment(
        request.body,
        request.user!.id
      );
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  public getAll = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.commentsService.getAllComments(request.params.id);
      console.log(request.params.id)
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
