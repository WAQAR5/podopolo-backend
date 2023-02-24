import express from "express";
import {
  createTweet,
  deleteTweet,
  updateTweet,
} from "../../controllers/tweet.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { getUserTweets } from "../../services/tweet.service";
import { createTweet as createTweetValidation } from "../../validations/tweet.validation";
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
