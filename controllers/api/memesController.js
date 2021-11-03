const express = require("express");
// const { now } = require("sequelize/types/lib/utils");
const router = express.Router();
const { Meme, User, Comments, Share } = require("../../models");
const IPO = require('../../market/shareListing');
// const session = require('session')

router.get("/:id", (req, res) => {
  Meme.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['img', 'number_shares', 'share_price', 'created_at'],
    include: [{
      model: User,
      attributes: ['username']
    }, {
      model: Comments,
      order: [
        ['created_at', 'DESC']
      ],
      attributes: ['comment_text', 'created_at'],
      include: { model: User, attributes: "username" }
    }
    // {
    //   model: Share,
    //   where: { is_initial: true },
    //   // attributes: ['id', 'listed_at', 'bought_price', 'meme_id']
    // }
    ]
  }).then(dbMemes => {
    if (dbMemes.length) {
      res.json(dbMemes);
    } else {
      res.status(404).json({ message: "No memes found!" });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err: err });
  });
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("You must be logged in to upload a meme")
  }
  Meme.create({
    img: req.body.img,
    number_shares: req.body.number_shares,
    share_price: req.body.share_price,
    is_initial: true,
    created_at: req.body.created_at,
    user_id: req.session.user.id,
  }).then(newMeme => {
    console.log(newMeme);

    IPO(req.session.user.id, newMeme, newMeme.number_shares, newMeme.share_price);
    res.json(newMeme.toJSON());
  }).catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.put('/buy/:id', async (req, res) => {
  const amt = req.body.amt;
  const newMeme = Meme.findOne({
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
