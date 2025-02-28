const { User } = require('../../models/user');
const { createError } = require('../../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;

const login = async (req, res) => {
   const {email, password} = req.body;
   const user = await User.findOne({email})

   if (!user) {
    throw createError(401, "Email or password is wrong")
   }
   if (!user.verify) {
    throw createError(401, "Email not verify");
   }
   const compareResult = await bcrypt.compare(password, user.password);
   if (!compareResult) {
    throw createError(401, "Email or password is wrong")
   }
   
   const payload = {
    id: user._id
   };

   const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "48h"});
   await User.findByIdAndUpdate(user._id, {token})

   res.json({
    token,
    user: {
        email: user.email,
        subscription: user.subscription
    }
   })
};

module.exports = login;