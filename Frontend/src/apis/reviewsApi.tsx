import { IEventReviewsResponse } from "../interfaces/review.interface";
import { eventApi } from "./axios";

export const GetReviews = async (): Promise<IEventReviewsResponse> => {
  const response = await eventApi.get("/reviews");
  return response.data;
};
