import express from "express";
import httpStatus from "http-status";
import {
  addBalance,
  deductBalance,
  subscribeToLiveRates,
} from "../../controllers/market.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { share } from "../../validations/market.validation";
import { liveRateValidation } from "../../validations/subscriber.validation";

const marketRoute = express.Router();

marketRoute.get("/", [], (req, res) => {
  res.status(httpStatus.OK).send({ message: "Market Module" });
});

marketRoute.post(
  "/purchase_shares",
  [auth("market"), validate(share)],
  addBalance
);

marketRoute.post(
  "/sell_shares",
  [auth("market"), validate(share)],
  deductBalance
);

marketRoute.post(
  "/subscribe_live_rates",
  [auth("market"), validate(liveRateValidation)],
  subscribeToLiveRates
);

export default marketRoute;
