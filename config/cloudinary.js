const Cloudinary = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const cloudinary = Cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  upload_preset: process.env.CLD_PRESET,
  api_key: process.env.CLD_KEY,
  api_secret: process.env.CLD_SECRET,
  secure: true
});

module.exports = cloudinary;