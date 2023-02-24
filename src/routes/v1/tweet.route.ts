import httpStatus from "http-status";
import express from "express";
import {
  createTweet,
  deleteTweet,
  updateTweet,
} from "../../controllers/tweet.controller";
import validate from "../../middlewares/validate";
import { createTweet as createTweetValidation } from "../../validations/tweet.validation";
import auth from "../../middlewares/auth";
import { getUserTweets } from "../../services/tweet.service";
const tweetRoute = express.Router();

tweetRoute.get("/", auth("tweet"), getUserTweets);

tweetRoute.post(
  "/create",
  [auth("tweet"), validate(createTweetValidation)],
  createTweet
);

tweetRoute.delete("/:id", auth("tweet"), deleteTweet);
tweetRoute.patch("/:id", auth("tweet"), updateTweet);

export default tweetRoute;
