const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.post(
  "/register",
  validation(schemas.registerUpSchema),
  ctrlWrapper(ctrl.register)
);

router.get(
  "/login",
  validation(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post(
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
