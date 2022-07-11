const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const changeAvatar = async (req, res) => {

    const { path: tempDir, originalname} = req.file;
    const {_id} = req.user;
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`
    const resultDir = path.join(avatarsDir, newName);
    await fs.rename(tempDir, resultDir);

    const file = await jimp.read(resultDir);
    const fileResize = await file.resize(250, 250);
    await fileResize.write(resultDir);

    const avatarURL = path.join("avtars", newName);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL
    })
};

module.exports = changeAvatar;