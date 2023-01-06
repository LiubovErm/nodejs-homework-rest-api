const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
  const contactToAdd = await contactsOperations.addContact(req.body);
    
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contactToAdd
    },
  });
};

module.exports = add;