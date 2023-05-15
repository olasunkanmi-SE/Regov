import { HydratedDocument } from "mongoose";
import { Event, IEvent } from "../models";

export class EventService {
  static async create(props: IEvent) {
    const { title, content, type } = props;
    const event: HydratedDocument<IEvent> = new Event({ title, content, type });
    const createdEvent = await event.save();
    return createdEvent;
  }
}
