import { HydratedDocument } from "mongoose";
import { IReview, Review } from "../models";
import { EventService } from "./event-service";
import { UserService } from "./user-service";
import { IEventReview } from "../interfaces/create-review-interface";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";

export class ReviewService {
  static async create(props: IEventReview) {
    const { content, user, event, rate } = props;
    const existingUser = await UserService.getUser(user.toString());
    const existingEvent = await EventService.getEvent(event.toString());
    let review: HydratedDocument<IReview>;
    if (existingUser && existingEvent) {
      if (rate) {
        const reviewedEvent = await EventService.getEvent(event);
        if (reviewedEvent) {
          const calculatedRating = await EventService.rate(event, rate);
          review = new Review({ content, user, event, rate });
          existingEvent.ratings.push(rate);
          await EventService.updateEvent(event, {
            ratings: existingEvent.ratings,
            averageRate: calculatedRating[0],
          });
        }
      }
      const createdReview = await review.save();
      if (!createdReview) {
        throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.serverError);
      }
      return createdReview;
    }
  }
  static async getReviews() {
    const reviews: HydratedDocument<IReview>[] = await Review.find();
    return reviews;
  }
}
