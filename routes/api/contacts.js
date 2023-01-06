const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactsSchema);


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router
