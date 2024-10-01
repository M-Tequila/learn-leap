import { NextFunction, Request, Response } from "express";
import Joi from "joi";
export default class CourseValidators {
  validateCreateCourseRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      title: Joi.string().required().min(5),
      description: Joi.string().min(10).required(),
      price: Joi.number().required(),
      type: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  validateGetSingleCourseRequest = (
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
