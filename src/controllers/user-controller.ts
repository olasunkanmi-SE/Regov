import * as express from "express";
import { RequestValidation } from "../utility/request-validator";
import { UserService } from "../services/user-service";
import { CreateUserDTO } from "../interfaces/create-user-interface";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";

export class UserController {
  path = "/users";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, this.createUser);
    this.router.post(this.path + "/authenticate", this.authenticateUser);
  }

  private async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as CreateUserDTO;
      const error = RequestValidation.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({ error });
      }
      const user = await UserService.create(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(true, HTTP_RESPONSE_CODE.SUCCESS, APP_ERROR_MESSAGE.createdUser, user, {
          type: "POST",
          url: "http://localhost:3000/api/users",
        })
      );
    } catch (error) {
      next(error);
    }
  }

  private async authenticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as CreateUserDTO;
      const authenticatedUser = await UserService.authenticateUser(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.userAuthenticated,
          authenticatedUser,
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
      const id = req.params.id;
      const user = await UserService.getUser(id);
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
}
