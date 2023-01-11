const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const contactToUpdate = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    
  if (!contactToUpdate) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contactToUpdate,
    },
  });
};

module.exports = updateById;