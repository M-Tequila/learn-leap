import { CreateCourseDto } from "../dtos";
import Course, { ICourse } from "../schema/course";
export interface ICourseRepository {
  create(course: CreateCourseDto,tutorId:string,backgroundImageId:string): Promise<ICourse>;
  findById(id: string): Promise<ICourse | null>;
  findAll(): Promise<ICourse[]>;
  findAllByCreatorId(id: string): Promise<ICourse[]>;

  deleteById(id: string): Promise<void>;
}
