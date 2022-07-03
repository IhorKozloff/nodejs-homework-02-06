const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validation } = require('../../midelwares');
const { schemas } = require('../../models/user');
const authCtrl = require('../../controllers/authCtrl');

const router = express.Router();



router.post("/register", validation(schemas.register), ctrlWrapper(authCtrl.register));
router.post("/login", validation(schemas.login), ctrlWrapper(authCtrl.login));


module.exports = router;