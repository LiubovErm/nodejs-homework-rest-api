const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    date: {
      user: {
        name: result.name,
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;