import { CreateCommentDTO } from "./dtos/create_comment.dto";
import Comment, { IComment } from "./comment.schema";
export default class CommentsRepository {
  createComment = async (dto: CreateCommentDTO): Promise<IComment> => {
    const data = new Comment({
      comment: dto.comment,
      course: dto.courseId,
      author: dto.authorId,
    });

    const comment = await data.save();
    return comment;
  };

  deleteComment = async (
    commentId: string,
    authorId: string
  ): Promise<IComment | null> => {
    const comment = await Comment.findOne({
      author: authorId,
      _id: commentId,
    });
    if (!comment) {
      return null;
    }
    await Comment.deleteOne({
      _id: commentId,
    });
    return comment;
  };

  getAllComments = async (courseId: string): Promise<IComment[]> => {
    console.log(`CourseID :${courseId}`);

    const comments = await Comment.find({
      course: courseId,
    })
      .populate("author", "firstName lastName")
      // .populate("course");

    return comments;
  };
}
