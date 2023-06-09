import * as express from "express";
import { RequestValidation } from "../utility/request-validator";
import { UserService } from "../services/user-service";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { IUser, User } from "../models";

export class UserController {
  path = "/users";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, this.createUser);
    this.router.get(this.path, this.getUsers);
    this.router.get(this.path + "/user", this.getUser);
    this.router.post(this.path + "/authenticate", this.authenticateUser);
    this.router.delete(this.path, this.deleteUsers);
  }

  private async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as IUser;
      const error = RequestValidation.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({ error });
      }
      const user = await UserService.create(reqBody);
      const userToJson = user.toJSON();
      const { password, ...response } = userToJson;
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(true, HTTP_RESPONSE_CODE.SUCCESS, APP_ERROR_MESSAGE.createdUser, response, {
          type: "POST",
          url: "http://localhost:4000/users",
        })
      );
    } catch (error) {
      next(error);
    }
  }

  private async authenticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as IUser;
      const authenticatedUser = await UserService.authenticateUser(reqBody);
      const { password, ...response } = authenticatedUser;
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.userAuthenticated,
          response,
          {
            type: "POST",
            url: "http://localhost:3000/api/users/authenticate",
          }
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.query.id;
      const user = await UserService.getUserById(id.toString());
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(true, HTTP_RESPONSE_CODE.SUCCESS, APP_ERROR_MESSAGE.userReturned, user, {
          type: "POST",
          url: `http://localhost:3000/api/users/${id}`,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const users = await UserService.getUsers();
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(true, HTTP_RESPONSE_CODE.SUCCESS, APP_ERROR_MESSAGE.usersReturned, users, {
          type: "GET",
          url: `http://localhost:3000/api/users`,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      return await UserService.deleteUsers();
    } catch (error) {
      next(error);
    }
  }
}
