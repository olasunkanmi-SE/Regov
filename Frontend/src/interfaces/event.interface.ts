import { IUser } from "../models/user.model";

export interface ICreateEvent {
  title: string;
  content: string;
  type: string;
}

export interface IEventsResponse extends IapiResponse {
  data: IEvent[];
}

export interface IEventResponse extends IapiResponse {
  data: IEvent;
}

export interface IEvent {
  _id: string;
  userId: string;
  user: IUser;
  content: string;
  ratings: string[];
  title: string;
  type: string;
  averageRate: string;
  createdDateTime: string;
  createdBy: string;
  modifiedBy: string;
  modifiedDateTime: string;
}

export interface IapiResponse {
  success: boolean;
  code: number;
  message: string;
}
