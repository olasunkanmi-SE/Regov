import { HydratedDocument } from "mongoose";
import { Event, IEvent } from "../models";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";

export class EventService {
  static async create(props: IEvent) {
    const { title, content, type } = props;
    const event: HydratedDocument<IEvent> = new Event({ title, content, type });
    const createdEvent = await event.save();
    return createdEvent;
  }

  static async getEvent(id: string) {
    const event = await Event.findById(id);
    if (!event) {
      throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.eventDoesntExist);
    }
    return event;
  }

  static async getEvents() {
    const events: HydratedDocument<IEvent>[] = await Event.find();
    return events;
  }
}
