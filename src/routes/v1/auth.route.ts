import { login, register } from "../../controllers/auth.controller";
import validate from "../../middlewares/validate";
const express = require("express");
const authValidation = require("../../validations/auth.validation");
const router = express.Router();

router.post("/register", validate(authValidation.register), register);
router.post("/login", validate(authValidation.login), login);

module.exports = router;
