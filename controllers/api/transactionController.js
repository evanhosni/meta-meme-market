const express = require('express');
const router = express.Router();
const { User, Meme, Comments } = require('../../models');
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll({
        include: [Meme, Group]
    }).then(dbUsers => {
        if (dbUsers.length) {
            res.json(dbUsers)
        } else {
            res.status(404).json({ message: "No users found!" })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err })
    })
})

module.exports = router;