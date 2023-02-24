import Subscriber from "../models/subscriber.model";

const createSubscriber = async (user: string, endpoint: string) => {
  return await Subscriber.create({
    user,
    endpoint,
  });
};

export { createSubscriber };
