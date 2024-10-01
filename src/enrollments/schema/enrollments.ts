import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../../user/schema/user";
import { ICourse } from "../../course/schema/course";

export interface IEnrollment extends Document {
  user: IUser["_id"];
  course: ICourse["_id"];
  createdAt: Date;
}

const enrollmentSchema: Schema<IEnrollment> = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
