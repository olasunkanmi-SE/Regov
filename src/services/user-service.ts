import { HydratedDocument, ObjectId } from "mongoose";
import { HttpException } from "../exceptions/exception";
import { IUser, User } from "../models";
import { RequestValidation } from "../utility/request-validator";
import * as bcrypt from "bcrypt";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";

export class UserService {
  private static async checkIfUserExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return user ? true : false;
  }

  static async create(props: IUser) {
    const { email, password } = props;
    const userExists = await UserService.checkIfUserExists(email);
    if (userExists) {
      throw new HttpException(400, "user already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user: HydratedDocument<IUser> = new User({
      email,
      password: hashPassword,
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
    return user;
  }

  static async getUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.userDoesntExist);
    }
    return user;
  }

  static async getUsers() {
    const users = await User.find();
    return users;
  }
}
