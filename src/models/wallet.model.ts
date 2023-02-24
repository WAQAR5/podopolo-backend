import { Document, Types, Schema, model } from "mongoose";

interface IWallet extends Document {
  user: any;
  balance: number;
}

const walletSchema = new Schema<IWallet>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

const Wallet = model<IWallet>("Wallet", walletSchema);

export default Wallet;
