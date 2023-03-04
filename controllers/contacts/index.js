const listContacts = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const removeContact = require("./removeById");
const updateContact = require("./updateById");
const updateStatusContact = require("./updateFavorite");

module.exports = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}