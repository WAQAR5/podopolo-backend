import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

const addBalance = catchAsync(async (req, res) => {
  // contains req.body.amount
  res.status(httpStatus.OK).send({ message: "Balance Updated" });
});

export { addBalance };
