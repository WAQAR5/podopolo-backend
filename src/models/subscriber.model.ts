import { Document, model, Schema, Types } from "mongoose";

interface ISubscriber extends Document<Types.ObjectId> {
  endpoint: string;
  user: any;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    endpoint: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Subscriber = model<ISubscriber>("Subscriber", subscriberSchema);

export default Subscriber;
