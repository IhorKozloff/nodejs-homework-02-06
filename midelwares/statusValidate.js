const { createError } = require('../helpers');

const statusValidate = (req, res, next) => {
    console.log(req.body.favorite)
    if (req.body.favorite === undefined) {
        const  error = createError(400, "missing field favorite");
        return next(error);
    }
    next();
}

module.exports = statusValidate;