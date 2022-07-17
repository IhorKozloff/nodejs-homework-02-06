const { User } = require('../../models/user');
const { createError, sendMail } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const idGenerate = require('bson-objectid')

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user) {
        throw createError(409, "Email in use")
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);
    const verificationToken = idGenerate();

    const result = await User.create(
        {
         ...req.body,
         password: hashedPass, 
         avatarURL, 
         verificationToken
        }
    );

    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="blanck" href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения</a>`
    }
    await sendMail(mail);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    })
};

module.exports = register;