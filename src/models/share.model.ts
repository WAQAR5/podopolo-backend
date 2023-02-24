import { Document, Types, Schema, model } from "mongoose";

interface IShare extends Document {
  amount: number;
  user: any;
  stock: any;
}

const shareSchema = new Schema<IShare>(
  {
    amount: { type: Number, required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    stock: { type: Types.ObjectId, ref: "Stock", required: true },
  },
  { timestamps: true }
);

const Share = model<IShare>("Share", shareSchema);

export default Share;