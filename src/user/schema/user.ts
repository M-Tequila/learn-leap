import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "student" | "tutor" | "admin";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
  isVerified?: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "Please provide a valid first name"],
      maxlength: 50,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a valid last name"],
      maxlength: 50,
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
