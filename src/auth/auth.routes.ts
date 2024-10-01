import { Router } from "express";
// import 'express-async-errors';
import AuthController from "./auth.controller";
import AuthValidators from "./middlewares/auth_validators";
import AuthService from "./auth.service";

export default class AuthRoutes {
  /***/
  private readonly authController = new AuthController();
  private readonly router: Router;
  private authValidators = new AuthValidators();
  constructor() {
    this.router = Router();

    this.setupRoutes();
  }

  private setupRoutes(): void {
    /**
     * @openapi
     * /auth/login:
     *   post:
     *     summary: Log in with credentials
     *     description: Logs in a user using their email and password.
     *     tags:
     *       - Authentication
     *     requestBody:
     *       description: User credentials
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *               email: john@example.com
     *               password: mysecretpassword
     *     responses:
     *       200:
     *         description: Successfully logged in.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *               example:
     *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *       401:
     *         description: Invalid credentials.
     *       
     * 
     * 
     * 
     * 
     * 
     */
    this.router.post(
      "/login",
      this.authValidators.validateLoginRequest,
      this.authController.login
    );

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Register a new user
     *     description: Registers a new user with the provided details.
     *     tags:
     *       - Authentication
     *     requestBody:
     *       description: User details for registration
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *               name: John Doe
     *               email: john@example.com
     *               password: mysecretpassword
     *     responses:
     *       201:
     *         description: User registered successfully.
     *       400:
     *         description: Invalid input data.
     */
    this.router.post(
      "/signup",
      this.authValidators.validateSignUpRequest,
      this.authController.signup
    );

    /**
     * @swagger
     * /auth/forgot-password:
     *   post:
     *     summary: Send reset password instructions
     *     description: Sends an email to the user with instructions on how to reset their password.
     *     tags:
     *       - Authentication
     *     requestBody:
     *       description: User's email address
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *             example:
     *               email: john@example.com
     *     responses:
     *       200:
     *         description: Reset password instructions sent successfully.
     *       404:
     *         description: User with the provided email not found.
     */
    this.router.post(
      "/forgot-password",
      this.authValidators.validateForgotPasswordRequest,
      this.authController.forgotPassword
    );
    this.router.post(
      "/verify-otp",
      this.authValidators.validateVerifyOtpRequest,
      this.authController.verifyOTP
    );
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/authentication";
}
