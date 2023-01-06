const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contactsAll = await contactsOperations.listContacts();
  
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsAll,
    },
  });
};

module.exports = getAll;