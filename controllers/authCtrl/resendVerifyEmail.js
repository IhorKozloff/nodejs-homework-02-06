const {User} = require('../../models/user');
const { createError, sendMail} = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    console.log(email)
    const user = await User.findOne({email});
    if (!user) {
        throw createError(404);
    }
    if (user.verify) {
        throw createError(400, "Verification has already been passed")
    }
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="blanck" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Нажмите для подтверждения</a>`
    }
    await sendMail(mail);
    res.json({
        message: "Verification email sent"
    })
};
module.exports = resendVerifyEmail;