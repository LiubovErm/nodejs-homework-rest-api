const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactsSchema);


router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router
