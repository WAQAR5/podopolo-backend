import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import {
  deleteTweetbyId,
  getTweetById,
  getUserTweets,
  saveMultipleTweets,
  saveTweet,
  updateTweetMessageById,
} from "../services/tweet.service";
import mongoose from "mongoose";

const createTweet = catchAsync(async (req, res) => {
  const {
    user,
    body,
  }: { user: IUser; body: { message: string; id: number }[] } = req;

  const sortedTweets = body.sort((a, b) => a.id - b.id);

  const IS_THREAD = body.length > 1;

  const savePayload = {
    message: sortedTweets[0].message,
    user: user._id,
    isThread: IS_THREAD,
    isParent: IS_THREAD ? true : false,
  };
  const parentTweet = await saveTweet(savePayload);

  if (IS_THREAD) {
    const threads = sortedTweets.splice(0, 1).map((tweet, index) => {
      return {
        message: tweet.message,
        user: user._id,
        isThread: true,
        isParent: false,
        tweetIndex: index + 1,
        parentTweet: parentTweet._id,
      };
    });

    await saveMultipleTweets(threads);
  }

  res.status(httpStatus.OK).send({ message: "tweet created successfully" });
});

const getTweet = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: "success" });
});

const getUserTweet = catchAsync(async (req, res) => {
  const user = req.user;
  const tweets = await getUserTweets(user._id);
  res.status(httpStatus.OK).send({ message: "success", tweets });
});

const deleteTweet = catchAsync(async (req, res) => {
  const tweetId = req.params.id;

  const user = req.user;

  if (!tweetId) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "tweet id is required" });
  }

  const tweet = await getTweetById(tweetId);

  if (!tweet) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Tweet not found" });
  } else {
    if (tweet.user.toString() !== user._id.toString()) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "Unauthorized" });
    } else {
      await deleteTweetbyId(tweetId);
      return res
        .status(httpStatus.OK)
        .send({ message: "Tweet deleted successfully" });
    }
  }
});

const updateTweet = catchAsync(async (req, res) => {
  const tweetId = req.params.id;
  const { message } = req.body;
  const user = req.user;

  if (!tweetId) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "tweet id is required" });
  }

  const tweet = await getTweetById(tweetId);

  if (!tweet) {
    res.status(httpStatus.NOT_FOUND).send({ message: "Tweet not found" });
  } else {
    if (tweet.user.toString() !== user._id.toString()) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
    } else {
      await updateTweetMessageById(tweetId, message);
      res.status(httpStatus.OK).send({ message: "Tweet updated successfully" });
    }
  }
});

export { createTweet, getTweet, deleteTweet, getUserTweet, updateTweet };
