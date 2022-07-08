const { User } = require('../../models/user');
const { createError } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user) {
        throw createError(409, "Email in use")
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email)
    const result = await User.create({...req.body, password: hashedPass, avatarURL});
    
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    })
};

module.exports = register;