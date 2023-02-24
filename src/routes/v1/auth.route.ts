import validate from "../../middlewares/validate";
const express = require("express");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");
const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
