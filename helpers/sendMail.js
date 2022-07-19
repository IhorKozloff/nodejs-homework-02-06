const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY)

const sendMail = async (data) => {
    const mail = {...data, from: "ik.eyeshield21@gmail.com"}
    await sgMail.send(mail);
    return true;
}
module.exports = sendMail;