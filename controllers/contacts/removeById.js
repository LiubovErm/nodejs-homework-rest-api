const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const contactToDelete = await contactsOperations.removeContact(contactId);
    if (!contactToDelete) {
        throw new NotFound(`Contact with id ${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            contactToDelete
        }
    })
}

module.exports = removeById;