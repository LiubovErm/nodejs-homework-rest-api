const { Contact } = require("../../models/contact");

const listContacts = async (_, res) => {
  const contactsAll = await Contact.find({}, "-createdAt -updatedAt");
  
  res.status(200).json(
    contactsAll,
);
};

module.exports = listContacts;