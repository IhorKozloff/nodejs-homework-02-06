const { createError } = require("../helpers")
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { User } = require('../models/user')
const authValid = async (req, res, next) => {
  
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer") {
            throw createError(401, "Not authorized")
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY);

            const user = await User.findById(id);

            if (!user || !user.token) {
                throw createError(401, "Not authorized")
            }
            req.user = user;
            next();
        } catch(error) {
            error.status = 401;
            error.message = "Not authorized";
            throw error
        }
        
    } catch(error) {
        next(error)
    }






};

module.exports = authValid;