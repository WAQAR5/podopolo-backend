import { Document, Types, Schema, model } from "mongoose";

export interface IStock extends Document {
  name: string;
  symbol: string;
  price: number;
}

const stockSchema = new Schema<IStock>(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Stock = model<IStock>("Stock", stockSchema);

export default Stock;
