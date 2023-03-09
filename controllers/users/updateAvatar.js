const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {  
        const { _id } = req.user;
        const {path: tempUpload, filename} = req.file;
        const [extension] = filename.split(".").reverse();
        const avatarName = `${_id}.${extension}`;
    try {
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
      
        Jimp.read(resultUpload, (err, avatar) => {
         if (err) throw err;
             avatar
            .resize(250, 250) 
            .quality(60)  
            .write(resultUpload); 
        });

        const avatarURL = path.join("avatars", resultUpload);
        await User.findByIdAndUpdate(_id, {avatarURL});

        res.json({
            status: "success",
            code: 200,
            avatarURL,
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}


module.exports = updateAvatar;