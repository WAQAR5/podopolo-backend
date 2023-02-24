import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { createUser } from "../services/user.service";

const register = catchAsync(async (req, res) => {
  console.log("🚀 ~ file: auth.controller.ts:6 ~ register ~ req:", req);

  res.status(httpStatus.OK).send({ message: "success" });
});

export { register };
