const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    status: "success",
    code: 204,
    data: {
      message: "Logout",
    },
  });
};

module.exports = logout;
