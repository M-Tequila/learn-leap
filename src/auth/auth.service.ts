import { LoginDto } from "./dtos/login.dto";
import bcrypt from "bcrypt";
import SignupDTO from "./dtos/signup.dto";
import User, { IUser } from "../user/schema/user";
import { ForgotPasswordDTO } from "./dtos/forgot-password.dto";
import { VerifyOtpDTO } from "./dtos/verify_otp.dto";
import { BadRequestError } from "../errors/bad-request-error";

import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenRequestError } from "../errors/forbidden-request-error";
import { NotFoundRequestError } from "../errors/not-found-request-error";
import CacheService from "../cache/cache.service";
import { CacheKey } from "../cache/cache-keys";
import HttpException from "../errors/base-http-exception";
export type JWTPayload = {
  id: string;
  email: string;
};

interface OtpSchema {
  code: string;
  expiration: number;
}
export default class AuthService {
  private cacheService = new CacheService();

  /**
   * login
   */
  public async login(dto: LoginDto) {
    const email = dto.email;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new HttpException(400, "No User found");
    }
    if (!user.isVerified) {
      throw new HttpException(
        403,
        "User account has not been verified, please verify your account and try again."
      );
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new HttpException(403, "Invalid credentials");
    }

    const jwtSecret = 'my secret';
    const tokenPayload: JWTPayload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(tokenPayload, jwtSecret!, {
      expiresIn: "5d",
    });
    const tokenInfo = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

    const data = {
      user: user.toJSON(),
      token: {
        token,
        expiry: tokenInfo.exp,
      },
    };

    return data;
  }

  /**
   * signup
   */
  public async signup(dto: SignupDTO) {
    const email = dto.email;
    const user = await User.findOne({
      email,
    });
    if (user) {
      throw new ForbiddenRequestError("User already exists");
    }
    try {
      const hash = await bcrypt.hash(dto.password, 10);
      const userData = new User({
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        role: dto.role,
        password: hash,
        isVerified: true,
      });
      const userInfo = await userData.save();
      // await this.generateOtp(email);
      console.log(`New User Create ::::: ${JSON.stringify(userInfo)}`);
      // const data = {};
      // const jwtSecret = process.env.JWT_SECRET as string;
      // const tokenPayload: JWTPayload = {
      //   email: userInfo.email,
      //   id: userInfo._id,
      // };
      // const token = jwt.sign(tokenPayload, jwtSecret!, {
      //   expiresIn: "5d",
      // });
      // const tokenInfo = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

      const data = {
        user: userInfo.toJSON(),
      };
      //   Send OTP to email
      // return `An Email has been sendt to ${dto.email}, it expires in 5 minutes`;
      return data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  /**
   * forgotPassword
   */
  public async forgotPassword(dto: ForgotPasswordDTO) {
    const email = dto.email;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundRequestError("No user found.");
    }
    // const user = await this.userRepository.findByEmail(dto.email);
    // if (!user) {
    //   throw new Error("No user found with tgis emaul.");
    // }
    // GENERATE OTP AND SENd
    // await this.mailService.sendMail({
    //   body: "",
    //   from: "",
    //   to: "",
    // });

    return `An OTP has been sent to yput email address`;
  }

  /**
   * verifyOTP
   */
  public verifyOTP = async (dto: VerifyOtpDTO) => {
    const email = dto.email;

    const data = await this.cacheService.getValue({
      cacheKey: CacheKey.OTP,
      dataKey: email,
    });
    if (!data) {
      throw new NotFoundRequestError(`No user found with email ${email}`);
    }
    const decoded = JSON.parse(data) as OtpSchema;
    const date = new Date();
    if (date.getTime() > decoded.expiration) {
      throw new ForbiddenRequestError("OTP code has expired.");
    }
    if (decoded.code !== dto.code) {
      throw new ForbiddenRequestError("Invalid OTP code.");
    }
    // * Validate user and delete OTP
    await User.findOneAndUpdate({
      $where: dto.email,
    });
    // * Delete OTP
  };

  private generateOtp = async (email: string) => {
    const currentTime = new Date();
    const minutesToAdd = 5;
    currentTime.setTime(currentTime.getTime() + minutesToAdd * 60000);
    const code = this.genrateRandomNumbers(5);
    const date = currentTime.getTime();
    const schema: OtpSchema = {
      code,
      expiration: date,
    };
    const encoded = JSON.stringify(schema);
    await this.cacheService.setValue({
      cacheKey: CacheKey.OTP,
      data: encoded,
      dataKey: email,
    });
  };

  private genrateRandomNumbers = (numberOfRandomNumbers: number | 5) => {
    let value: string = "";
    for (let i = 0; i < numberOfRandomNumbers; i++) {
      const randomNumber = Math.random();
      value + randomNumber;
    }
    return value;
  };
}
