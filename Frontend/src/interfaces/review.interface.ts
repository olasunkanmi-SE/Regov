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

export interface IEventReviewsResponse {
  data: IEventReviewResponse[];
}
