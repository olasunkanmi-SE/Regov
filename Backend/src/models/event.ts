import { model, Schema, Types } from "mongoose";

export enum eventType {
  POST = "post",
  DRAFT = "draft",
}
export interface IEvent {
  userId?: Types.ObjectId;
  user?: any;
  title: string;
  content: string;
  ratings?: number[];
  averageRate?: number;
  type: eventType;
  createdDateTime?: string;
  createdBy?: string;
  modifiedBy?: string;
  modifiedDateTime?: string;
  deletedBy?: string;
  deletedDateTime?: string;
}
const eventSchema = new Schema<IEvent>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: Object,
  },
  content: {
    type: String,
    required: true,
  },
  ratings: {
    type: [Number],
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  averageRate: {
    type: Number,
  },
  createdDateTime: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  modifiedBy: {
    type: String,
  },
  modifiedDateTime: {
    type: String,
  },
  deletedBy: {
    type: String,
  },
  deletedDateTime: {
    type: String,
  },
});
export const Event = model("Event", eventSchema);
