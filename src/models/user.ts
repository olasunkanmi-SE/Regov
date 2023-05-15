import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const User = model("User", userSchema);