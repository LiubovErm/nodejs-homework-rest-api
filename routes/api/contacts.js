const express = require('express');

const router = express.Router();

const { schemas } = require("../../models/contact");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");


router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.put("/:id", isValidId, validation(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch("/:id/favorite", isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;