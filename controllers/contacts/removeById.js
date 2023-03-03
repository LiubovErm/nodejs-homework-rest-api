const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const contactToDelete = await Contact.findByIdAndRemove(id);

  if (!contactToDelete) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = removeContact;
