const { Contact } = require("../../models/contact");

const getAll = async (_, res) => {
  const contactsAll = await Contact.find({}, "-createdAt -updatedAt");
  
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsAll,
    },
  });
};

module.exports = getAll;