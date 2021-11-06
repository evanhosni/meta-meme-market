const express = require("express");
// const { now } = require("sequelize/types/lib/utils");
const router = express.Router();
const { Meme, User, Comments, Share } = require("../../models");
const { IPO, sellShares } = require('../../market/shareListing');
const { Op } = require('sequelize');
const { getMeme, getUserShares } = require('../../market/getModels');
// const session = require('session')

// router.get("/:id", (req, res) => {
//   Meme.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: ['img', 'number_shares', 'share_price', 'created_at'],
//     include: [{
//       model: User,
//       attributes: ['username']
//     }, {
//       model: Comments,
//       order: [
//         ['created_at', 'DESC']
//       ],
//       attributes: ['comment_text', 'created_at'],
//       include: { model: User, attributes: "username" }
//     },
//     {
//       model: Share,
//       where: { is_initial: true },
//       // attributes: ['id', 'listed_at', 'bought_price', 'meme_id']
//     }
//     ]
//   }).then(dbMemes => {
//     if (dbMemes.length) {
//       res.json(dbMemes);
//     } else {
//       res.status(404).json({ message: "No memes found!" });
//     }
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json({ message: "an error occured", err: err });
//   });
// });
router.get('/buy/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("You must be logged in to buy!")
    }
    const amt = 1;
    try {
        const meme = await Meme.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Share,
            where: {
                [Op.and]: {
                    [Op.not]: { listed_at: null },
                    [Op.not]: { user_id: req.session.user.id }
                }
            },
            order: [
                ['bought_price', 'ASC'],
                ['listed_at', 'ASC']
            ],
            include: [User],
            limit: amt
        }
        });
        const buyer = await User.findOne({
            where: {
                id: req.session.user.id
            }});
        
        await require('../../market/transaction')(buyer, meme, amt);
        const memeData = await getMeme(req.params.id);
        // console.log(memeData);
        res.status(200).json(memeData.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'an error occured', err: err })
    }
});

router.get('/sell/:id', (req, res) => {
    // const quantity = req.body.quantity;
    // const price = req.body.price;
    if (!req.session.user) {
        return res.status(401).send("You must be logged in to sell!")
    }
    const quantity = 1;
    const price = 1;
    User.findOne({
        where: {
            id: req.session.user.id
        },
        include: {
            model: Share,
            where: {
                meme_id: req.params.id,
                listed_at: null
            },
            limit: quantity
        }
    })
    .then(async (seller) => {
        const soldSuccess = seller.shares.length ? true : false;
        await sellShares(seller, price);
        const memeData = await getMeme(req.params.id);
        const userData = await getUserShares(req.session.user.id, req.params.id);
        let stake = null;
        let listedShares = (userData.shares.filter(share => share.dataValues.listed_at !== null).length)
        if (userData) {
            numShares = userData.shares.length;
            // console.log(userData.shares.length, memeData.number_shares);
            stake = (Math.round((userData.shares.length / memeData.number_shares) * 100));
        }
        console.log(memeData);
        console.log(userData, numShares, stake, listedShares);
        res.status(200).json({ numShares: numShares, stake: stake, listedShares: listedShares, soldSuccess: soldSuccess });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/stake/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("You must be logged in to see your stake in this meme!")
    }
    const owned = await Share.count({
        where: { 
            meme_id: req.params.id,
            user_id: req.session.user.id
        }
    });
    console.log(owned);
    Meme.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['number_shares']
    }).then(meme => {
        if (!meme) res.status(404).send('No meme with that id exists!');
        const ratio = owned / meme.number_shares;
        res.status(200).json({ stake: ratio });
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("You must be logged in to upload a meme")
  }
  Meme.create({
    img: req.body.img,
    title: req.body.title,
    number_shares: req.body.number_shares,
    share_price: req.body.share_price,
    is_initial: true,
    created_at: req.body.created_at,
    user_id: req.session.user.id,
  }).then(newMeme => {
    // console.log(newMeme);

    IPO(req.session.user.id, newMeme, newMeme.number_shares, newMeme.share_price);
    res.json(newMeme.toJSON());
  }).catch(err => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

module.exports = router;
