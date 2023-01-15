const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = updateSubscription;