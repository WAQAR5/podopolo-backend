import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { toJSON, paginate } from "./plugins";
import { roles } from "../config/roles";

export interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string;
  role: string;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
  isAddressTaken: (address: string, excludeUserId?: string) => Promise<boolean>;
  isUsernameTaken: (
    username: string,
    excludeUserId?: string
  ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isUsernameTaken = async function (
  userName: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.password);
};

userSchema.pre<UserDocument>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
