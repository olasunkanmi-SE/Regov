import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { CreateUserDTO } from "../interfaces/create-user-interface";

interface IUserError {
  body?: string;
  email?: string;
  password?: string;
}
export class RequestValidation {
  static isEmail(prop: string): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return prop.match(regex) ? true : false;
  }

  static validUserRequest(prop: CreateUserDTO): IUserError {
    let error: IUserError = {};
    if (!Object.keys(prop).length) {
      error.body = "The request body cannot be empty";
      return error;
    }
    Object.entries(prop).forEach(([key, value]) => {
      if (key === "email" && !RequestValidation.isEmail(value)) {
        error.email = "Provide a valid email";
      }
      if (key === "password" && value.length < 8) {
        error.password = "Password length must be greater than 7";
      }
      if (!value) {
        error.body = `${key} is required`;
      }
    });
    return error;
  }

  static createAPIResponse(
    success: boolean,
    code: number,
    message: string,
    data: any,
    request: { type: string; url: string }
  ) {
    return {
      success,
      code,
      message,
      data,
      request,
    };
  }
}
