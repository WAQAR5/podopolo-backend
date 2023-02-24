import httpStatus from "http-status";
import validate from "../../middlewares/validate";
import express from "express";

const authValidation = require("../../validations/auth.validation");

import { register } from "../../controllers/auth.controller";
const authRoute = express.Router();

authRoute.get("/", [], (req, res) => {
  res.status(httpStatus.OK).send({ message: "success" });
});

authRoute.post("/register", validate(authValidation.register), register);

export default authRoute;
