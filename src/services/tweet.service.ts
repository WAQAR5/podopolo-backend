import mongoose from "mongoose";
import Tweet, { ITweet } from "../models/tweet.model";

const saveTweet = async (payload: ITweet) => {
  const response = await Tweet.create([payload]);
  return response[0];
};

const saveMultipleTweets = async (payload: ITweet[]) => {
  return await Tweet.insertMany(payload);
};

const getTweetById = async (id: string) => {
  return await Tweet.findById(id);
};

const updateTweetMessageById = async (id: string, message: string) => {
  return await Tweet.findOneAndUpdate({ _id: id }, { message }, { new: true });
};

const deleteTweetbyId = async (id: string) => {
  return await Tweet.deleteOne({ _id: id });
};

const getUserTweets = async (user: string) => {
  return await Tweet.find({ user }).sort({ createdAt: -1 });
};

export {
  saveTweet,
  saveMultipleTweets,
  getTweetById,
  updateTweetMessageById,
  deleteTweetbyId,
  getUserTweets,
};
