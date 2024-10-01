import HttpException from "../errors/base-http-exception";
import { CreateCourseDto } from "./dtos";
import { CourseRepository } from "./repository/course_repository";
import logger from "../utils/logger";
import FileService from "../files/file.service";
import File, { FileType, IFile } from "../files/schema/file";
import * as uuid from "uuid";

export default class CourseService {
  courseRepository = new CourseRepository();
  fileService = new FileService();

  /**
   * createCourse
   */
  public createCourse = async (
    dto: CreateCourseDto,
    instructorId: string,
    files: Express.Multer.File[]
  ) => {
    // let mediaFile: IFile;
    try {
      logger.debug(`Creating Course with data :: ${JSON.stringify(dto)}`);
      // mediaFile = await this.fileService.uploadFile(media, FileType.IMAGE);
      const backgroundImageData = new File({
        url: "https://images.unsplash.com/photo-1577760258779-e787a1733016?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        name: `${dto.title}-${uuid.v4()}`,
        key: uuid.v4(),
        type: FileType.IMAGE,
      });
      const backgroundImage = await backgroundImageData.save();
      const mediaData = new File({
        url: "https://docs.google.com/document/d/1pnr-lSMeXdZc4gfEOAOZMoGU37Prtg9mEXTAawe1xUg/edit?usp=sharing",
        name: `${dto.title}-${uuid.v4()}`,
        key: uuid.v4(),
        type: FileType.DOCUMENT,
      });
      const media = await backgroundImageData.save();
      const response = await this.courseRepository.create(
        {
          title: dto.title,
          description: dto.description,
          price: dto.price,
          type: dto.type,
        },
        instructorId,
        backgroundImage._id,
        media._id
      );
      logger.debug(`Newly created course... ${response.toJSON()}`);
      const data = {
        message: `successfully created course titled ${dto.title}`,
        ...response.toJSON(),
      };
      return data;
    } catch (error) {
      console.log(`Error creating course:: ${JSON.stringify(error)}`);
      logger.error("This is an error message.", {
        additionalData: JSON.stringify(error),
      });
      throw new HttpException(500, `${JSON.stringify(error)}`);
      // Catch and Handle MongoDB Errors
    }
  };

  /**
   * getCourseById
   */
  public getCourseById = async (id: string) => {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new HttpException(404, "Course not found");
    }
    return {
      message: "successfully fetched course.",
      data: {
        ...course.toJSON(),
      },
    };
  };

  /**
   * deleteCourse
   */
  public deleteCourse = async (id: string, creatorId: string) => {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new HttpException(404, `Not course found with this id ${id}`);
    }
    if (course.instructor._id !== creatorId) {
      throw new HttpException(
        403,
        `User can only delete course that was creted by the user.`
      );
    }
    await this.courseRepository.deleteById(id);
    return {
      message: `Successfully deleted course with id ${id}`,
    };
  };

  /**
   * getAllCourses
   */
  public getAllCourses = async () => {
    const response = await this.courseRepository.findAll();
    return {
      message: `Successfully retrieved all courses`,
      data: {
        ...response,
      },
    };
  };

  /**
   * getAllCoursesByInstructorId
   */
  public getAllCoursesByInstructorId = async (id: string) => {
    const response = await this.courseRepository.findAllByCreatorId(id);
    return {
      message: `Successfully retrieved all courses created by instructor`,
      data: {
        ...response,
      },
    };
  };
  public getCoursesByType = async (courseType: string) => {
    const response = await this.courseRepository.findByType(courseType);
    return {
      message: `Successfully retrieved all courses`,
      data: {
        ...response,
      },
    };
  };
}
