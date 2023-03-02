const contactsOperations = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contactsAll = await contactsOperations.allContacts();
  
  res.status(200).json(
      contactsAll,
  );
};

module.exports = listContacts;