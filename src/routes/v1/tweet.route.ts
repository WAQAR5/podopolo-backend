import httpStatus from "http-status";
import express from "express";
import { createTweet, deleteTweet } from "../../controllers/tweet.controller";
import validate from "../../middlewares/validate";
import { createTweet as createTweetValidation } from "../../validations/tweet.validation";
const tweetRoute = express.Router();

tweetRoute.get("/", [], (req, res) => {
  res.status(httpStatus.OK).send({ message: "Tweet Module" });
});

tweetRoute.post("/create", validate(createTweetValidation), createTweet);

//This need to be checked
tweetRoute.delete("/:id", [], deleteTweet);

export default tweetRoute;
