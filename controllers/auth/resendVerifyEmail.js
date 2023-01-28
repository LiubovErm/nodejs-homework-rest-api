const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");
const { NotFound, BadRequest } = require("http-errors");

const resendVerifyEmail = async(req, res)=> {
    const { email } = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw new NotFound("User not found");
    }
    if(user.verify) {
       throw new BadRequest("Verification has already been passed");
    };
    const mail = {
        to: email,
        subject: "Підтвердження реєстраціі на сайті",
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Нажміть для підтвердження email</a>`
    };
    await sendEmail(mail);
    
   res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerifyEmail;