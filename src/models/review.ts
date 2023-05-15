import { model, Schema, Types } from "mongoose";

export interface IReview {
  content: string;
  user: Types.ObjectId;
  event: Types.ObjectId;
}
const reviewSchema = new Schema<IReview>({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  event: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
});
export const Review = model("Review", reviewSchema);
