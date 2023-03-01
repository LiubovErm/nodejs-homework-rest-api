const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contactToDelete = await contactsOperations.remove(contactId);
    if (!contactToDelete) {
        throw new NotFound(`Not found`);
    }
    res.status(200).json({
        message: "contact deleted",
    })
}

module.exports = removeContact;