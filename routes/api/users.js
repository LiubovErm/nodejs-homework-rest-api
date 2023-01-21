const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

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
