import { Document, Types, Schema, model } from "mongoose";

export interface IShare {
  _id?: string;
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
