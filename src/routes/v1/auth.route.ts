import { login, register, logout } from "../../controllers/auth.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
const express = require("express");
const authValidation = require("../../validations/auth.validation");
const router = express.Router();

router.post("/register", validate(authValidation.register), register);
router.post("/login", validate(authValidation.login), login);
router.post("/logout", auth("logout"), logout);

module.exports = router;
