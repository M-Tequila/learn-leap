import { NextFunction, Request, Response } from "express";
import Joi from "joi";
export default class ChapterValidators {
  validateCreateChapterRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      title: Joi.string().required().min(5),
      content: Joi.string().min(10).required(),
      course_id: Joi.string().required(),
      background_image: Joi.string(),
      index: Joi.number().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  validateSingleChapterRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}
