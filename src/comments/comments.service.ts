import { CourseRepository } from "../course/repository/course_repository";
import { NotFoundRequestError } from "../errors";
import HttpException from "../errors/base-http-exception";
import CommentsRepository from "./coments.repository";
import { CreateCommentDTO } from "./dtos/create_comment.dto";

export default class CommentService {
  private commentsRepository: CommentsRepository = new CommentsRepository();
  private coursesRepository = new CourseRepository();
  public createComment = async (dto: CreateCommentDTO) => {
    const data = await this.commentsRepository.createComment(dto);
    return {
      message: "successfully added comment",
      data,
    };
  };

  public deleteComment = async (commentid: string, authorId: string) => {
    const data = await this.commentsRepository.deleteComment(
      commentid,
      authorId
    );
    if (!data) {
      throw new NotFoundRequestError("Comment not found");
    }
    return {
      message: "successfully deleted comment",
    };
  };

  public getAllComments = async (courseId: string) => {
    const course = await this.coursesRepository.findById(courseId);
    if (!course) {
      throw new HttpException(404, `Course with id ${courseId} does not exist`);
    }
    const result = await this.commentsRepository.getAllComments(courseId);
    return {
      message: "successfully fetched all comments",
      data: result,
    };
  };
}
