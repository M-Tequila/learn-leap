import mongoose, { Schema, Document } from "mongoose";

export interface ILecture extends Document {
  title: string;
  content: string;
  chapterId: string;
}

const lectureSchema: Schema<ILecture> = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
  chapterId: {
    type: String,
    ref: "Chapter",
    required: [true, "Please provide a chapter"],
  },
});

const Lecture = mongoose.model<ILecture>("Lecture", lectureSchema);

export default Lecture;
