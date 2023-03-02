const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToUpdate = await contactsOperations.update(contactId, req.body);
    
  if (!contactToUpdate) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json({
      contactToUpdate,
  });
};

module.exports = updateContact;