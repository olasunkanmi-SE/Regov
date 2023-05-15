import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/exception";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const errors = error.error;
  response.status(status).send({ status, message, error: errors });
}

export default errorMiddleware;
