import mongoose, { Document, Schema } from "mongoose";
import { ICourse } from "../course/schema/course";
import { IUser } from "../user/schema/user";
export interface IComment extends Document {
  comment: string;
  createdAt: Date;
  course: ICourse["_id"];
  author: IUser["_id"];
}

const commentSchema: Schema<IComment> = new Schema<IComment>({
  comment: {
    type: "string",
    required: [true, "Comment is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },

  createdAt: {
    type: "Date",
    default: Date.now(),
  },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
