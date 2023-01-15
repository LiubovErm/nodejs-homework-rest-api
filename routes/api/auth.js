const express = require('express');
const router = express.Router();

const { schemas } = require("../../models/user");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

router.post(
  "/register",
  validation(schemas.registerUpSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get(
  "/logout",
  auth,
  ctrlWrapper(ctrl.logout));


module.exports = router;
