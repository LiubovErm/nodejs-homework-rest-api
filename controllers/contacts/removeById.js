const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers");

const removeById = async (req, res) => {
    const { id } = req.params;
    const contactToDelete = await Contact.findByIdAndRemove(id);
    if (!contactToDelete) {
        throw HttpError(404, "Not found");
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            contactToDelete,
        }
    })
}

module.exports = removeById;