import { IEvent, IUser } from "../models";

interface IError {
  body?: string;
  email?: string;
  password?: string;
  title?: string;
  content?: string;
  type?: string;
  reviewContent?: string;
  user?: string;
  rate?: string;
  role?: string;
}
export class RequestValidation {
  static isEmail(prop: string): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return prop.match(regex) ? true : false;
  }

  static validUserRequest(prop: IUser): IError {
    let error: IError = {};
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
      if (key === "role" && !value.length) {
        error.role = "user role is required";
      }
      if (key === "userName" && !value.length) {
        error.role = "username is required";
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

  static validateEventRequest(props: IEvent) {
    let error: IError = {};
    Object.entries(props).forEach(([value, key]) => {
      if (!value) {
        error.body = `${key} is required`;
      }
      if (value === "title" && value.length < 5) {
        error.title = "title is too short";
      }
      if (key === "type" && (value !== "post" || "draft")) {
        error.type = "event type should either be post or draft";
      }
      if (key === "content" && value.length < 10) {
        error.content = "content is too short";
      }
    });
    return error;
  }

  static validateReviewRequest(props: IEvent) {
    let error: IError = {};
    Object.entries(props).forEach(([key, value]) => {
      if (key === "content") {
        if (!value.length) {
          error.reviewContent = "content is required";
        }
        if (value.length < 5) {
          error.reviewContent = "content is too short";
        }
      }
      if (key === "user" && !value.length) {
        error.user = "userId is required";
      }
      if (key === "event" && !value.length) {
        error.user = "eventId is required";
      }
      if (key === "rate" && Number(value) > 5) {
        error.rate = "Rate should be lesser than or equal to 5";
      }
    });

    return error;
  }
}