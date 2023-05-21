import * as express from "express";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { authenticate } from "../middlewares/auth-middleware";
import { IEvent } from "../models";
import { EventService } from "../services";
import { RequestValidation } from "../utility/request-validator";

export class EventController {
  path = "/events";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, authenticate, this.createEvent);
    this.router.get(this.path, this.getEvents);
    this.router.get(this.path + "/event", this.getEventById);
    this.router.delete(this.path, this.deleteEvents);
  }

  async createEvent(req: any, res: express.Response, next: express.NextFunction) {
    try {
      const user = req.user;
      const reqBody = req.body as IEvent;
      const error = RequestValidation.validateEventRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({ error });
      }
      const event = await EventService.create(reqBody, user);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(true, HTTP_RESPONSE_CODE.SUCCESS, APP_ERROR_MESSAGE.eventCreated, event, {
          type: "POST",
          url: "http://localhost:4000/events",
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async getEvents(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const events = await EventService.getEvents();
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.eventsReturned,
          events,
          {
            type: "GET",
            url: `http://localhost:3000/api/events`,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.query.id.toString();
      const events = await EventService.getEvent(id);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.eventsReturned,
          events,
          {
            type: "GET",
            url: `http://localhost:3000/api/events/${id}`,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteEvents(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      return await EventService.deleteEvents();
    } catch (error) {
      next(error);
    }
  }
}
