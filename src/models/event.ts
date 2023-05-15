import { model, Schema } from "mongoose";

export interface IEvent {
  title: string;
  content: string;
  rating?: number;
}
const eventSchema = new Schema<IEvent>({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
});
export const Event = model("Event", eventSchema);
