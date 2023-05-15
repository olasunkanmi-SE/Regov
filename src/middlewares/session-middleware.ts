import * as express from "express";
import { HttpException } from "../exceptions/exception";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
export function requireLogin(req: any, res: express.Response, next: express.NextFunction) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    throw new HttpException(HTTP_RESPONSE_CODE.UNAUTHORIZED, "You must be logged in to perform this action");
  }
}
