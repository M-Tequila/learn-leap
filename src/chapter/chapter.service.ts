import { NotFoundRequestError } from "../errors";
import ChapterRepository from "./chapter.repository";
import {CreateChapterDto} from "./dtos/index";

export default class ChapterService {
  private chapterRepository: ChapterRepository = new ChapterRepository();

  public create = async (dto: CreateChapterDto) => {
    const response = await this.chapterRepository.createChapter(dto);
    return response;
  };

  public deleteById = async (id: string) => {
    return await this.chapterRepository.deleteById(id);
  };

  public getById = async (id: string) => {
    const response = await this.chapterRepository.getByID(id);
    if (!response) {
      throw new NotFoundRequestError("chapter not found");
    }
    return response;
  };

  public getAllCoursesByCourseId = async (id: string) => {
    return await this.chapterRepository.getAllChapters(id);
  };
}
