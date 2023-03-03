const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const contactToAdd = await Contact.create(req.body);
    
  res.status(201).json(
      contactToAdd
  );
};

module.exports = addContact;
