const express = require("express");
const router = express.Router();
const { Meme, User, Comments, Share } = require("../../models");
const { IPO, sellShares } = require('../../market/shareListing');
const { Op } = require('sequelize');
const { getListedMeme, getUserShares } = require('../../market/getModels');
const { buyShares } = require('../../market/transaction');
const { sequelize } = require("../../models/User");

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
                    // [Op.not]: { user_id: req.session.user.id }
                }
            },
            attributes: ['id', 'listed_at', 'bought_price', 'user_id', 'meme_id', [sequelize.fn('SUM', sequelize.col('bought_price')), 'total']],
            group: 'bought_price',
            order: [
                ['bought_price', 'ASC'],
                ['listed_at', 'ASC']
            ],
            include: [User],
            limit: amt
        }
        });

        if (!meme) return res.status(404).send('Meme not found!');

        console.log(meme.shares);

        const buyer = await User.findOne({
            where: {
                id: req.session.user.id
            }});

        if (!buyer) return res.status(404).send('User not found!');
        
        const { buyCount, totalCost } = await buyShares(buyer, meme, amt);
        // console.log(`Boughtcount: ${boughtCount}, totalCost: ${totalCost}`);
        // if (boughtCount < amt)
        const memeData = await getListedMeme(req.params.id);
        // console.log(memeData);
        res.status(200).json({ boughtCount: buyCount, memeData: memeData.toJSON(), totalCost: totalCost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'an error occured', err: err })
    }
});

router.get('/meme/:id', async (req, res) => {
    try {
        const memeData = await getListedMeme(req.params.id);
        if (!memeData) return res.status(404).send('Meme not found!');
        res.status(200).json(memeData.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
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
