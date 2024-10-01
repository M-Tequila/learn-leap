import { ICourseRepository } from "../course/interface/course_repository_interface";
import { CourseRepository } from "../course/repository/course_repository";
import logger from "../utils/logger";

// import { NotFoundRequestError } from "../errors";
import { CreateChapterDto } from "./dtos/index";
import Chapter, { IChapter } from "./schema/chapter";
export default class ChapterRepository {
  private courseRepository = new CourseRepository();
  /*
    Create a new Chapter under a specific course.
    
*/
  createChapter = async (dto: CreateChapterDto): Promise<IChapter | null> => {
    const courseExists = await this.courseRepository.findById(dto.course_id);
    if (!courseExists) {
      //   throw new NotFoundRequestError("No course found with this id");
      return null;
    }
    const data = new Chapter({
      courseId: dto.course_id,
      title: dto.title,
      content: dto.content,
      backgroundImage: dto.background_image,
      index: dto.index,
    });
    const result = await data.save();
    return result.toJSON();
  };

  /**
   * delete a chpater by id
   */
  public deleteById = async (id: string) => {
    const deletdChapter = await Chapter.findByIdAndDelete(id).exec();
    if (!deletdChapter) {
      logger.debug("No chapter to delete");
    } else {
      logger.debug("Deleted Chapter with id: " + id);
    }
  };

  /**
   * get chapter single chapter
   */
  public getByID = async (id: string): Promise<IChapter | null> => {
    const response = await Chapter.findById({
      _id: id,
    }).exec();
    if (!response) {
      return null;
    }
    return response.toJSON();
  };

  /*
  Get all chapters under a course 
  */

  public getAllChapters = async (courseId: string): Promise<IChapter[]> => {
    const chpaters = await Chapter.find({
      courseId: courseId,
    })
      .sort("index")
      .exec();

    return chpaters.map((e) => e.toJSON());
  };
}
