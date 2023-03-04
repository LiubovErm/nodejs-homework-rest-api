const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contactToUpdate = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    
  if (!contactToUpdate) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(
    contactToUpdate,
);
};

module.exports = updateContact;