import { Schema, model, Document, Types } from "mongoose";

interface ITweet extends Document {
  user: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  parentTweet?: Types.ObjectId;
  isThread: boolean;
}

const tweetSchema = new Schema<ITweet>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    parentTweet: { type: Types.ObjectId, ref: "Tweet", default: undefined },
    isThread: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Tweet = model<ITweet>("Tweet", tweetSchema);

export default Tweet;
