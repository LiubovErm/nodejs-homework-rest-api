const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contactToUpdate = await contactsOperations.updateContact(contactId, req.body);
    
  if (!contactToUpdate) {
    throw new NotFound(`Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contactToUpdate,
    },
  });
};

module.exports = updateById;