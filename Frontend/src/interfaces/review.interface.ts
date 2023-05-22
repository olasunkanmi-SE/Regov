import { IapiResponse } from "./event.interface";

export interface IEventReview {
  content: string;
  user: string;
  event: string;
  rate?: number;
}

export interface IEventReviewResponse {
  _id: string;
  content: string;
  rate?: number;
  userName?: string;
}

export interface IReviewsResponse extends IapiResponse {
  data: IEventReviewResponse[];
}

export interface IEventReviewsResponse extends IapiResponse {
  data: IEventReviewResponse[];
}
