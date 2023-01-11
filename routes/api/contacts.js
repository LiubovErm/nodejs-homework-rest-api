const express = require('express');

const router = express.Router();

const { schemas } = require("../../models/contact");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.put("/:id", isValidId, validation(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
