import * as express from "express";
import { RequestValidation } from "../utility/request-validator";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { EventService } from "../services";
import { IEvent } from "../models";

export class EventController {
  path = "/events";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, this.createEvent);
    this.router.get(this.path, this.getEvents);
  }

  async createEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reqBody = req.body as IEvent;
      const error = RequestValidation.validateEventRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({ error });
      }
      const event = await EventService.create(reqBody);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(true, HTTP_RESPONSE_CODE.SUCCESS, APP_ERROR_MESSAGE.eventCreated, event, {
          type: "POST",
          url: "http://localhost:3000/api/events",
        })
      );
    } catch (error) {}
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
            url: `http://localhost:3000/api/reviews`,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
