import { model, Schema } from "mongoose";

export enum eventType {
  POST = "post",
  DRAFT = "draft",
}
export interface IEvent {
  title: string;
  content: string;
  ratings?: number[];
  averageRate?: number;
  type: eventType;
}
const eventSchema = new Schema<IEvent>({
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
});
export const Event = model("Event", eventSchema);