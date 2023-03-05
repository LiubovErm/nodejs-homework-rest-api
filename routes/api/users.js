const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

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

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
