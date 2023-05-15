import { HydratedDocument } from "mongoose";
import { IReview, Review } from "../models";
import { EventService } from "./event-service";
import { UserService } from "./user-service";
import { IEventReview } from "../interfaces/create-review-interface";

export class ReviewService {
  static async create(props: IEventReview) {
    const { content, user, event } = props;
    const existingUser = await UserService.getUser(user.toString());
    const existingEvent = await EventService.getEvent(event.toString());
    let review: HydratedDocument<IReview>;
    if (existingUser && existingEvent) {
      review = await new Review({
        content,
        user,
        event,
      });
    }
    return review;
  }

  static async getReviews() {
    const reviews: HydratedDocument<IReview>[] = await Review.find();
    return reviews;
  }
}
