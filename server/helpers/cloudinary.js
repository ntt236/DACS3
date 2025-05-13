const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage()

const imageUploadUtils = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })
    return result;

}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtils }


