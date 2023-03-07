const express = require('express');
const router = express.Router();

const { schemas } = require("../../models/contact");
const { validation, ctrlWrapper, isValidId, auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");


router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.put("/:id", isValidId, validation(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;