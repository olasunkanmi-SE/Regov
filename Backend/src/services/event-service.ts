import { HydratedDocument, Types } from "mongoose";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { HttpException } from "../exceptions/exception";
import { Event, IEvent, IUser } from "../models";
import { IAudit } from "../models/audit";
import { UserService } from "./user-service";

export class EventService {
  static async create(props: IEvent, user: any) {
    const { title, content, type } = props;
    const audit: IAudit = {
      createdDateTime: new Date().toISOString(),
      createdBy: user.email,
    };
    const userResponse = await UserService.getUserById(user.id.toString());
    const response = userResponse.toJSON();
    let event: HydratedDocument<IEvent> | undefined;
    const { password, ...res } = response;
    if (userResponse) {
      event = new Event({ title, userId: response._id, content, type, ...audit, user: res });
    }
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
    const events: HydratedDocument<IEvent>[] = await Event.find({})
      .where({ type: "post" })
      .sort({ createdDateTime: "desc" });
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
    if (Object.hasOwnProperty.call(props, "averageRate")) {
      event.averageRate = props.averageRate;
    }
    if (Object.hasOwnProperty.call(props, "type")) {
      event.type = props.type;
    }
    const audit: IAudit = {
      modifiedDateTime: new Date().toISOString(),
      modifiedBy: user.email,
    };
    event.modifiedBy = audit.modifiedBy;
    event.modifiedDateTime = audit.modifiedDateTime;
    const updatedEvent = await event.save();
    if (!updatedEvent) {
      throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError);
    }
    return updatedEvent;
  }

  static async deleteEvents() {
    return await Event.deleteMany();
  }

  static getEventByIds(ids: Types.ObjectId[]) {
    return Event.find({ _id: ids });
  }

  static getEventDrafts() {
    return Event.find({ type: "draft" });
  }
}
