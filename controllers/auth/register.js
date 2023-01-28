const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");
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
  const verificationToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken
  });
  const mail = {
        to: email,
        subject: "Підтвердження реєстраціі на сайті",
        html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Нажміть для підтвердження email</a>`
    };
  await sendEmail(mail);
  
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