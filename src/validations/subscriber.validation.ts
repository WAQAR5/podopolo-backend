import Joi from "joi";

const liveRateValidation = {
  body: Joi.object().keys({
    endpoint: Joi.string().required(),
  }),
};

export { liveRateValidation };
