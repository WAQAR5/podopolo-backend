import express from "express";
import httpStatus from "http-status";
import { addBalance } from "../../controllers/market.controller";
import validate from "../../middlewares/validate";
import { balance } from "../../validations/market.validation";

const marketRoute = express.Router();

marketRoute.get("/", [], (req, res) => {
  res.status(httpStatus.OK).send({ message: "Market Module" });
});

marketRoute.post("/addBalance", validate(balance), addBalance);

export default marketRoute;
