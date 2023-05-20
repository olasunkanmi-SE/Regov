import { HydratedDocument } from "mongoose";
import { Event, IEvent, IUser } from "../models";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { IAudit } from "../models/audit";

export class EventService {
  static async create(props: IEvent, user: Partial<IUser>) {
    const { title, content, type } = props;
    const audit: IAudit = {
      createdDateTime: new Date().toISOString(),
      createdBy: user.email,
    };
    const event: HydratedDocument<IEvent> = new Event({ title, content, type, ...audit });
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

  static async rate(id: string, rate: number): Promise<[number, number[]]> {
    let averageRating: number = 0;
    let eventRatings: number[] = [];
    if (rate <= 5) {
      const event: HydratedDocument<IEvent> = await EventService.getEvent(id);
      eventRatings = event.ratings;
      eventRatings.push(rate);
      let totalRatings = eventRatings.length;
      let totalScore = eventRatings.reduce((a, b) => a + b, 0);
      averageRating = totalScore / totalRatings;
    }
    return [averageRating, eventRatings];
  }

  static async updateEvent(id: string, props: Partial<IEvent>, user: Partial<IUser>) {
    const event = await EventService.getEvent(id);
    if (Object.hasOwnProperty.call(props, "content")) {
      event.content = props.content;
    }
    if (Object.hasOwnProperty.call(props, "ratings")) {
      event.ratings = props.ratings;
    }
    if (Object.hasOwnProperty.call(props, "rate")) {
      event.averageRate = props.averageRate;
    }
    const audit: IAudit = {
      modifiedDateTime: new Date().toISOString(),
      modifiedBy: user.email,
    };
    event.modifiedBy = audit.modifiedBy;
    event.modifiedDateTime = audit.modifiedDateTime;
    await event.save();
  }
}
