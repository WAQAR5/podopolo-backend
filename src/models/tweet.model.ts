import {
  Schema,
  model,
  Document,
  Types,
  ObjectId,
  SchemaDefinitionProperty,
} from "mongoose";

interface ITweet extends Document {
  message: string;
  user: any;
  parentTweet?: any;
  isThread: boolean;
}

const tweetSchema = new Schema<ITweet>(
  {
    message: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    parentTweet: { type: Types.ObjectId, ref: "Tweet", default: null },
    isThread: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Tweet = model<ITweet>("Tweet", tweetSchema);

export default Tweet;
