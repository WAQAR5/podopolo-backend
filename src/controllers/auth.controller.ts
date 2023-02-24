import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { createUser } from "../services/user.service";
import { generateAuthTokens } from "../services/token.service";

const register = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  const tokens = await generateAuthTokens(user);
  res
    .status(httpStatus.OK)
    .send({ message: "user created successfully", user, tokens });
});

export { register };
