import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";

export default class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  /**
   * login
   */
  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.authService.login(request.body);
    try {
      return response.status(200).json({
        message: "Successfully logged in",
        data,
      });
    } catch (error) {
      console.log(`Error from sign-in: ${error}`)
      next(error);
    }
  };

  /**
 * signup
   */
  public signup = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.authService.signup(request.body);
      return response.status(201).json({
        message: "User created successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * forgotPassword
   */
  public forgotPassword = async (request: Request, response: Response) => {
    // const data = await this.authService.forgotPassword(request.body);
    return response.status(200).json({
      message: "Success",
      // data,
    });
  };

  /**
   * verifyOTP
   */
  public verifyOTP = async (request: Request, response: Response) => {
    const data = await this.authService.verifyOTP(request.body);
    return response.status(200).json({
      message: data,
      // data,
    });
  };
}
