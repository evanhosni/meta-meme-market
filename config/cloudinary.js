const cloudinary = require('cloudinary').v2;
require('dotenv').config();
// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_KEY,
  api_secret: process.env.CLD_SECRET,
  secure: true
});

module.exports = myconfig;