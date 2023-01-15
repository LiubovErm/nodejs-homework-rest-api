const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  
  let filter = { owner: _id };
  if (favorite) {
    filter = {
      owner: _id,
      favorite: true
    };
  }

  const contactsAll = await Contact.find(filter, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsAll,
    },
  });
};

module.exports = getAll;
