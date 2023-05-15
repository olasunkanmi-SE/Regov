import * as express from "express";
import { RequestValidation } from "../utility/request-validator";
import { UserService } from "../services/user-service";
import { CreateUserDTO } from "../interfaces/create-user-interface";

export class UserController {
  path = "/users";
  router = express.Router();
  constructor() {}

  initRoutes() {
    this.router.post(this.path, this.createUser);
    this.router.post(this.path, this.authenticateUser);
  }

  private async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as CreateUserDTO;
      const error = RequestValidation.validUserRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.CREATED).json({ error });
      }
      const user = await UserService.create(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  }

  private async authenticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as CreateUserDTO;
      const authenticatedUser = await UserService.authenticateUser(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(authenticatedUser);
    } catch (error) {
      next(error);
    }
  }
}
