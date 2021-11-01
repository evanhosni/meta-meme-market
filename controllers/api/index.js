const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const memeRoutes = require("./memesController");
router.use("/memes",memeRoutes);

module.exports = router;