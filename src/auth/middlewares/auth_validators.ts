import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default class AuthValidators {
  validateLoginRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  validateSignUpRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      role: Joi.string().valid("student", "tutor", "admin").required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  validateForgotPasswordRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  validateVerifyOtpRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      code: Joi.string().min(5).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      // Handle validation error
      console.log(error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}
