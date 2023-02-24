import httpStatus from "http-status";
import {
  getShareByUserIdAndStockId,
  updateShareById,
} from "../services/share.service";
import { getStockById } from "../services/stock.service";
import { createSubscriber } from "../services/subscriber.service";
import {
  getWalletByUserId,
  updateWalletById,
} from "../services/wallet.service";
import catchAsync from "../utils/catchAsync";
// import { subscribeToLiveRates } from "../services/liveRates.service";

const addBalance = catchAsync(async (req, res) => {
  const user = req.user;
  const { stockId, amount } = req.body;

  /**
   *
   * please perform original balance deduction implementation here
   *
   */

  // Retrieve the user's wallet and share for the given stock
  const userWallet = await getWalletByUserId(user._id);
  const share = await getShareByUserIdAndStockId(user._id, stockId);

  // Throw an error if the user doesn't have any shares for the given stock
  if (!share) {
    throw new Error("User does not have any shares for the given stock");
  }

  const stock = await getStockById(stockId);

  const balanceToBeDeducted = amount * stock.price;

  // Throw an error if the user's wallet balance is less than the given amount
  if (userWallet.balance < balanceToBeDeducted) {
    throw new Error("Insufficient balance in user wallet");
  }

  // Update the share amount and the wallet balance in the database
  await updateShareById(share._id, {
    amount: share.amount + amount,
  });

  await updateWalletById(userWallet._id, {
    balance: userWallet.balance - balanceToBeDeducted,
  });

  // Send a response with a success message
  res.status(httpStatus.OK).send({ message: "Balance Updated" });
});

const deductBalance = catchAsync(async (req, res) => {
  const user = req.user;
  const { stockId, amount } = req.body;

  /**
   *
   * Please Add Original Balance Implementation Here
   *
   */

  // Retrieve the user's wallet and share for the given stock
  const userWallet = await getWalletByUserId(user._id);
  const share = await getShareByUserIdAndStockId(user._id, stockId);

  // Throw an error if the user doesn't have any shares for the given stock
  if (!share) {
    throw new Error("User does not have any shares for the given stock");
  }

  // Calculate the total shares the user has for the given stock
  const totalShares = share.amount;

  // Throw an error if the total shares are less than the given amount to be deducted
  if (totalShares < amount) {
    throw new Error("Insufficient shares for selling");
  }

  const stock = await getStockById(stockId);

  // Calculate the balance to be deducted from the user's wallet
  const balanceToBeDeducted = amount * stock.price;

  // Update the share amount and the wallet balance in the database
  await updateShareById(share._id, {
    amount: totalShares - amount,
  });

  await updateWalletById(userWallet._id, {
    balance: userWallet.balance + balanceToBeDeducted,
  });

  res.status(httpStatus.OK).send({ message: "Balance Updated" });
});

const subscribeToLiveRates = catchAsync(async (req, res) => {
  const user = req.user;
  const { endpoint } = req.body;
  await createSubscriber(user._id, endpoint);

  res
    .status(httpStatus.OK)
    .send({ message: "Subscribed to live rates successfully" });
});

export { addBalance, deductBalance, subscribeToLiveRates };
