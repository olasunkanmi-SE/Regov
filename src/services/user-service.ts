import { HydratedDocument } from "mongoose";
import { HttpException } from "../exceptions/exception";
import { IUser, User } from "../models";
import { CreateUserDTO } from "../interfaces/create-user-interface";
import { RequestValidation } from "../utility/request-validator";
import * as bcrypt from "bcrypt";

export class UserService {
  private static async checkIfUserExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return user ? true : false;
  }

  static async create(props: CreateUserDTO) {
    const { email, password } = props;
    RequestValidation.validUserRequest(props);
    const userExists = await UserService.checkIfUserExists(email);
    if (userExists) {
      throw new HttpException(400, "user already exists");
    }
    const hashPassword = bcrypt.hash(password, 10);
    const user: HydratedDocument<IUser> = new User({
      email,
      hashPassword,
    });
    const createdUser = await user.save();
    return createdUser;
  }

  static authenticateUser() {}
}
