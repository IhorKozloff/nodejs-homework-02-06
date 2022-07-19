const register = require("./register");
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const changeAvatar = require('./changeAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');


module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscription,
    changeAvatar,
    verifyEmail,
    resendVerifyEmail
}