import { model, Schema, Types } from "mongoose";

export interface IReview {
  content: string;
  user: Types.ObjectId;
  event: Types.ObjectId;
  rate?: number;
  createdDateTime: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedDateTime?: string;
  deletedBy?: string;
  deletedDateTime?: string;
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
  rate: {
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
export const Review = model("Review", reviewSchema);
