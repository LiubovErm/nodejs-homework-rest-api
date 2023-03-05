const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
    
  if (!contactById) {
    throw HttpError(404, "Not found");
    }
    
  res.json({
    status: "success",
    code: 200,
    data: {
      contactById,
    },
  });
};

module.exports = getById;