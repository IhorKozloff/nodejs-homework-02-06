const getCurrent = (req, res, next) => {

    const { email } = req.user;
console.log(req.user)
    res.json({
        email
    })
};
module.exports = getCurrent;