import { HydratedDocument, ObjectId } from "mongoose";
import { HttpException } from "../exceptions/exception";
import { IUser, User } from "../models";
import { RequestValidation } from "../utility/request-validator";
import * as bcrypt from "bcrypt";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, literals } from "../constants/constant";
import jwt from "jsonwebtoken";

enum querType {
  ID = "id",
  EMAIL = "email",
}
export class UserService {
  private static async checkIfUserExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return user ? true : false;
  }

  static async create(props: IUser) {
    let { email, password, role, userName } = props;
    const userExists = await UserService.checkIfUserExists(email);
    if (userExists) {
      throw new HttpException(400, "user already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    if (!role) {
      role = literals.user;
    }
    const user: HydratedDocument<IUser> = new User({
      email,
      password: hashPassword,
      role,
      userName,
    });
    const createdUser = await user.save();
    return createdUser;
  }

  static async authenticateUser(props: IUser) {
    const { email, password } = props;
    const validateEmail = RequestValidation.isEmail(email);
    if (!validateEmail) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST, APP_ERROR_MESSAGE.invalidEmail);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.invalidCredentials);
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST, APP_ERROR_MESSAGE.invalidEmail);
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign({ email: user.email, role: user.role, userName: user.userName }, accessTokenSecret, {
      expiresIn: "1h",
    });
    return { ...user.toJSON(), accessToken };
  }

  static async getUserById(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return user;
  }

  static async getUsers() {
    const users = await User.find();
    return users;
  }

  static async deleteUsers() {
    return await User.deleteMany();
  }
}
