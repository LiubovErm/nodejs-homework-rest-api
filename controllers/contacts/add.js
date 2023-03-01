const contactsOperations = require("../../models/contacts");

const addContact = async (req, res) => {
  const contactToAdd = await contactsOperations.add(req.body);
    
  res.status(201).json({
    data: {
      contactToAdd
    },
  });
};

module.exports = addContact;