import * as express from "express";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { RequestValidation } from "../utility/request-validator";
import { ReviewService } from "../services/review-services";
export class ReviewController {
  path = "/reviews";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path, this.createReview);
    this.router.get(this.path, this.getReviews);
  }

  async createReview(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const content = req.body.content;
      const user = req.query.user.toString();
      const event = req.query.event.toString();
      const error = RequestValidation.validateReviewRequest(req.body);
      if (Object.keys(error).length) {
        return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({ error });
      }
      const review = await ReviewService.create({ content, user, event });
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.reviewCreated,
          { _id: review._id, content: review.content },
          {
            type: "POST",
            url: "http://localhost:3000/api/reviews",
          }
        )
      );
    } catch (error) {}
  }

  async getReviews(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const reviews = await ReviewService.getReviews();
      const response = reviews.map((review) => {
        return {
          _id: review._id,
          content: review.content,
        };
      });
      return res.status(HTTP_RESPONSE_CODE.SUCCESS).json(
        RequestValidation.createAPIResponse(
          true,
          HTTP_RESPONSE_CODE.SUCCESS,
          APP_ERROR_MESSAGE.reviewsReturned,
          response,
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
