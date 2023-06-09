import * as express from "express";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { RequestValidation } from "../utility/request-validator";
import { ReviewService } from "../services/review-services";
import { authenticate } from "../middlewares/auth-middleware";
export class ReviewController {
  path = "/reviews";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, authenticate, this.createReview);
    this.router.get(this.path, this.getReviews);
    this.router.delete(this.path, this.deleteReviews);
    this.router.get(this.path + "/event/:id", this.getEventReviewsById);
  }

  async createReview(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const content = req.body.content;
      const user = req.body.user.toString();
      const event = req.body.event.toString();
      const rate = Number(req.body.rate);
      const error = RequestValidation.validateReviewRequest(req.body);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({ error });
      }
      const review = await ReviewService.create({ content, user, event, rate });
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.reviewCreated,
          {
            _id: review._id,
            content: review.content,
            rate: review.rate,
            userName: review.userName,
          },
          {
            type: "POST",
            url: "http://localhost:3000/reviews",
          }
        )
      );
    } catch (error) {}
  }

  async getReviews(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reviews = await ReviewService.getReviews();

      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.reviewsReturned,
          reviews,
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

  async deleteReviews(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      return await ReviewService.deleteReviews();
    } catch (error) {
      next(error);
    }
  }

  async getEventReviewsById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const id = req.params.id.toString();
      const events = await ReviewService.getEventReviews(id);
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.eventsReturned,
          events,
          {
            type: "GET",
            url: `http://localhost:3000/event/reviews/${id}`,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
