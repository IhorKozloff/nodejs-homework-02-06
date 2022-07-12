const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validation, authValid, upload } = require('../../midelwares');
const { schemas } = require('../../models/user');
const authCtrl = require('../../controllers/authCtrl');

const router = express.Router();



router.post("/register", validation(schemas.register), ctrlWrapper(authCtrl.register));
router.post("/login", validation(schemas.login), ctrlWrapper(authCtrl.login));

router.get("/current", authValid, ctrlWrapper(authCtrl.getCurrent));
router.get("/logout", authValid, ctrlWrapper(authCtrl.logout));




router.patch("/avatars", authValid, upload.single("avatarimage"), ctrlWrapper(authCtrl.changeAvatar));





router.patch("/users", authValid, validation(schemas.subscrValidate), ctrlWrapper(authCtrl.updateSubscription));


module.exports = router;
