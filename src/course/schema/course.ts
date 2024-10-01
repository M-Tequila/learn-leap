import mongoose, { Schema, Document } from "mongoose";
import { IFile } from "../../files/schema/file";
import { IUser } from "../../user/schema/user";

enum CourseType {
  CSC = "CSC",
  MTH = "MTH",
  CHM = "CHM",
}

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: IUser["_id"]; // Reference to the User model
  price: number;
  type: CourseType;
  createdAt: Date;
  media: IFile["_id"];
  backgroundImage: IFile["_id"];
}

const courseSchema: Schema<ICourse> = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  media: { type: Schema.Types.ObjectId, ref: "File" },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference the User model
  },
  price: {
    type: Number,
    default: 0.0,
  },
  type: {
    type: String,
    required: [true, "Please provide a type"],
    enum: Object.values(CourseType),
  },

  backgroundImage: { type: Schema.Types.ObjectId, ref: "File" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
