const express = require('express');
const router = express.Router();
const { Meme, User, Share } = require('../models');
const { Op } = require('sequelize');
const { getListedMeme } = require('../market/getModels');

//Homepage shows all memes sorted descending by created most recently
router.get("/", async (req, res) => {
    let balance;
    if (req.session.user){
        balance = (await User.findByPk(req.session.user.id)).balance;
    }
    Meme.findAll({
        order: [
            ["created_at", 'DESC']
        ],
        attributes: ['img', 'share_price', 'id'],
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Share,
            where: {
                [Op.and]: {
                    [Op.not]: { listed_at: null },
                    // [Op.not]: { user_id: req.session.user.id }
                }
            },
            order: [
                ['bought_price', 'ASC'],
                ['listed_at', 'ASC']
            ],
            limit: 1,
            required: false
        }]
    }).then(memeData => {
        const hbsMemes = memeData.map(meme => {
            const plainMeme = meme.get({ plain: true });
            if (plainMeme.shares.length) {
                plainMeme.value = plainMeme.shares[0].bought_price;
            } else {
                plainMeme.value = null;
            }
            return plainMeme;
        });
        res.render("home", {
            ...hbsMemes, loggedIn: req.session.loggedIn, currentUser: req.session.user,
            memes: hbsMemes, balance
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/meme", async (req, res) => {
    let user;
    let balance;
    try {
        if (req.session.user){
            try {
                user = await User.findByPk(req.session.user.id, {
                    include: {
                        model: Share,
                        where: {
                            meme_id: req.query.id
                        },
                        required: false
                    }
                });
                balance = user.balance;
            } catch (err) {
                console.error(err);
                return res.status(500).json(err);
            }
        }
        const memeData = await getListedMeme(req.query.id);
        if (!memeData) return res.status(404).send('No meme with this id found!');
        let numShares = 'no';
        let stake = null;
        if (user) {
            numShares = user.shares.length;
            stake = (Math.round((user.shares.length / memeData.number_shares) * 100));
        }
        const hbsMeme = memeData.get({ plain: true })
        res.render("meme", {
            ...hbsMeme, loggedIn: req.session.loggedIn, currentUser: req.session.user,
            meme: hbsMeme, balance, numShares, stake, username: user.username
        });
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get("/user/:username", async (req, res) => {
    let balance;
    if (req.session.user){
        balance = (await User.findByPk(req.session.user.id)).balance;
    }
    User.findOne({
        where: {
            username: req.params.username
        },
        attributes: ['username'],
        include: [{
            model: Meme,
            attributes: ['id','img','share_price','number_shares','user_id'],
            include: {
                model: Share,
                where: {
                    [Op.and]: {
                        [Op.not]: { listed_at: null },
                        // [Op.not]: { user_id: req.session.user.id }
                    }
                },
                order: [
                    ['bought_price', 'ASC'],
                    ['listed_at', 'ASC']
                ],
                limit: 1,
                required: false
            }
        }]
    }).then(userData => {
        const hbsUser = userData.get({ plain: true });
        for (meme of hbsUser.memes) {
            if (meme.shares.length) {
                meme.value = meme.shares[0].bought_price;
            } else {
                meme.value = null;
            }
        }
        if(req.session.loggedIn && req.session.user.username == req.params.username) {
            res.render("user", {
                ...hbsUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: true,
                user: hbsUser, balance
            })
        } else {
            res.render("user", {
                ...hbsUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: false,
                user: hbsUser, balance
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/signup", (req, res) => {
    if (req.session.user) {
        req.session.destroy()
    }
    res.render("signup")
})

//Renders login page unless already logged in
router.get("/login", (req, res) => {
    if (!req.session.user) {
        
        res.render("login")
    } else {
        console.log('HELP!');
        console.log(req.session);
        return res.redirect("/")
    }
})

router.get("/upload", async (req, res) => {
    let balance;
    if (req.session.user){
        balance = (await User.findByPk(req.session.user.id)).balance;
    }
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("upload", { loggedIn: req.session.loggedIn, currentUser: req.session.user, balance })
    }
})

router.get('/buy', async (req, res) => {
    let balance;
    if (req.session.user){
        balance = (await User.findByPk(req.session.user.id)).balance;
    }
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("buy", { loggedIn: req.session.loggedIn, currentUser: req.session.user, balance })
    }
})

router.get('/sell', async (req, res) => {
    let balance;
    if (req.session.user){
        balance = (await User.findByPk(req.session.user.id)).balance;
    }
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("sell", { loggedIn: req.session.loggedIn, currentUser: req.session.user, balance })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('*', (req, res) => {
    res.redirect('/')
})

module.exports = router;