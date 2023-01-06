const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsOperations.getContactById(contactId);
    
  if (!contactById) {
    throw new NotFound(`Contact with id ${contactId} not found`);
    }
    
  res.json({
    status: "success",
    code: 200,
    data: {
      contactById,
    },
  });
};

module.exports = getById;