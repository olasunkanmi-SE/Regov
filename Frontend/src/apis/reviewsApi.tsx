import { QueryObserverResult, useQuery } from "react-query";
import { IEventReviewsResponse } from "../interfaces/review.interface";
import { eventApi } from "./axios";

export const GetReviews = async (): Promise<IEventReviewsResponse> => {
  const response = await eventApi.get("/reviews");
  return response.data;
};

const QueryReviewItems = async (id: string): Promise<IEventReviewsResponse> => {
  const response = await eventApi.get(`/reviews/event/${id}`);
  return response.data.data;
};

export const GetEventReviewsById = (id: string): QueryObserverResult<any> => {
  return useQuery<any, Error>(["eventReviews", id], async () => QueryReviewItems(id), {
    staleTime: 10000,
    cacheTime: 10000,
    onSuccess: (res) => {
      return {
        data: res.data,
        isSuccess: res.success,
      };
    },
    onError: (err) => {
      return err.message;
    },
  });
};
