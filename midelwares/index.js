const validation = require('./validate');
const isValidId = require('./isValidId');
const statusValidate = require('./statusValidate');
const authValid = require('./authValid');
const upload = require('./upload');


module.exports = {
    validation,
    isValidId,
    statusValidate,
    authValid,
    upload
};