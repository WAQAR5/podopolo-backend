const httpStatus = require("http-status");

import catchAsync from "../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  //   const user = await userService.createUser(req.body);
  //   EVENT.emit("create-stats", {
  //     userId: user._id,
  //   });
  //   const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ message: "success" });
});

export { register };
