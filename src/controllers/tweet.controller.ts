import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

const createTweet = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: "success" });
});

const getTweet = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: "success" });
});

const deleteTweet = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: "success", id: req.params.id });
});

const updateTweet = catchAsync(async (req, res) => {});

export { createTweet, getTweet, deleteTweet };
