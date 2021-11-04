const express = require('express');
const router = express.Router();
require('../config/cloudinary');

const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;
const apiSecret = cloudinary.config().api_secret;

const signuploadform = () => {//TODO limit file size
    const timestamp = Math.round((new Date).getTime()/1000);
  
    const signature = cloudinary.utils.api_sign_request({
      timestamp: timestamp,
      eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260'}, apiSecret);
  
    return { timestamp, signature }
  }

// using this API should require authentication
router.get('/', function (req, res, next) {
  const sig = signuploadform()
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey
  })
})

module.exports = router
