const express = require("express");
const router = express.Router();
const { Meme,User } = require("../../models");

router.get("/", (req, res) => {
  Meme.findAll({
    include:[User]
  })
    .then(dbMemes => {
      if (dbMemes.length) {
        res.json(dbMemes);
      } else {
        res.status(404).json({ message: "No memes found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).send("log in first you knucklehead!")
  }
  Meme.create({
    name: req.body.name,
    species: req.body.species,
    age: req.body.age,
    UserId:req.session.user.id
  })
    .then(newMeme => {
      res.json(newMeme);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.put('/buy/:id', (req, res) => {
  const amt = req.body.amt;
  Meme.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(meme => {
    User.findOne({
      where: {
        id: req.session.user.id
      }
    }).then(async (buyer) => {
      await require('../../market/transaction')(buyer, meme, amt);
      res.status(200).json()
    })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'an error occured', err: err })
  })
});

module.exports = router;
