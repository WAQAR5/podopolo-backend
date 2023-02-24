import * as Joi from "joi";

const tweet = Joi.object({
  message: Joi.string().required(),
  id: Joi.number().integer().min(0).required(),
});

const createTweet = {
  body: Joi.array().items(tweet).min(1).required(),
};

export { createTweet };
