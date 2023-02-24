import * as Joi from "joi";

const balance = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

const share = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    stockId: Joi.string().required(),
  }),
};

export { balance, share };
