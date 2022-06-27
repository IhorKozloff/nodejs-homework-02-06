const { isValidObjectId } = require('mongoose');

const { createError } = require('../helpers');

const isValidId = (req, res, next) => {
    const result = isValidObjectId(req.params.contactId);
    if(!result) {
        const  error = createError(400, "Id is not valid");
        return next(error);
    }
    next();
}

module.exports = isValidId;