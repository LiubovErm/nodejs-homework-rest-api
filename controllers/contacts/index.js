const listContacts = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const removeContact = require("./removeById");
const updateContact = require("./updateById");

module.exports = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
}