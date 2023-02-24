import Share, { IShare } from "../models/share.model";
import Stock from "../models/stock.model";

const generateUserShareWallets = async (user: string) => {
  const stocks = await Stock.find({});

  const walletsPayload = stocks.map((stock) => {
    return {
      amount: 0,
      user,
      stock: stock._id,
    };
  });

  return await Share.insertMany(walletsPayload);
};

const getUserShares = async (user: string) => {
  return await Share.find({ user }).populate("stock");
};

const increaseShareBalance = async (id: string, balance) => {
  return await Share.findOneAndUpdate(
    { _id: id },
    {
      $inc: {
        balance,
      },
    }
  );
};

const getShareByUserIdAndStockId = async (
  userId: string,
  stockId: string
): Promise<IShare> => {
  const share = await Share.findOne({ user: userId, stock: stockId });
  return share;
};

const updateShareById = async (
  shareId: string,
  updates: any
): Promise<IShare> => {
  const updatedShare = await Share.findByIdAndUpdate(
    shareId,
    { $set: updates },
    { new: true }
  );
  if (!updatedShare) {
    throw new Error("Share not found");
  }
  return updatedShare;
};

export {
  generateUserShareWallets,
  getUserShares,
  increaseShareBalance,
  getShareByUserIdAndStockId,
  updateShareById,
};
