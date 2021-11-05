const express = require('express');
const router = express.Router();
const { Meme, User, Share } = require('../models');
const { Op } = require('sequelize');

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
        // res.json(hbsMemes)
        // if (req.session.id) {
        //     res.render("home")
        // }
        // else {
        //     res.render("home", {
        //         ...hbsMemes, loggedIn: req.session.loggedIn, currentUser: req.session.user.username,
        //         memes: hbsMemes
        //     })
        // }
        res.render("home", {
            ...hbsMemes, loggedIn: req.session.loggedIn, currentUser: req.session.user,
<<<<<<< HEAD
            memes: hbsMemes, balance
=======
            memes: hbsMemes
>>>>>>> dev
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

<<<<<<< HEAD
router.get("/meme/:id", async (req, res) => {//TODO change id to title so it's "/meme/:title"
=======
router.get("/meme/:id", (req, res) => {
>>>>>>> dev
    // res.render("meme")
    let balance;
    if (req.session.user){
        balance = (await User.findByPk(req.session.user.id)).balance;
    }
    Meme.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['img', 'share_price', 'number_shares', 'user_id'],
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Share,
            where: { is_initial: true },
            attributes: ['id', 'is_initial', 'listed_at', 'bought_price', 'meme_id'],
            required: false
        }]
    }).then(memeData => {
        // console.log(memeData)
        const hbsMeme = memeData.get({ plain: true })
        // res.json(hbsMemes)
        res.render("meme", {
            ...hbsMeme, loggedIn: req.session.loggedIn, currentUser: req.session.user,
<<<<<<< HEAD
            meme: hbsMeme, balance
        });
=======
            meme: hbsMeme
        })
>>>>>>> dev
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

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
<<<<<<< HEAD
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
        // const hbsUser = userData.get({plain:true})
        const plainUser = userData.get({ plain: true });
        for (meme of plainUser.memes) {
            if (meme.shares.length) {
                meme.value = meme.shares[0].bought_price;
            } else {
                meme.value = null;
            }
        }
        console.log({...plainUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: false,
            user: plainUser, balance})
        if(req.session.loggedIn && req.session.user.username == req.params.username) {
            res.render("user", {
                ...plainUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: true,
                user: plainUser, balance
            })
        } else {
            res.render("user", {
                ...plainUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: false,
                user: plainUser, balance
=======
            attributes: ['id', 'img', 'share_price', 'number_shares', 'user_id']
        }]
    }).then(userData => {
        console.log(userData.toJSON())
        const hbsUser = userData.get({ plain: true })
        if (req.session.loggedIn && req.session.user.username == req.params.username) {
            res.render("user", {
                ...hbsUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: true,
                user: hbsUser
            })
        } else {
            res.render("user", {
                ...hbsUser, loggedIn: req.session.loggedIn, currentUser: req.session.user, sameUser: false,
                user: hbsUser
>>>>>>> dev
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
        return res.redirect("/")
    }
})

router.get("/upload", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("upload", { loggedIn: req.session.loggedIn })
    }
})


router.get('/buy', (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("buy", { loggedIn: req.session.loggedIn })
    }
})

router.get('/sell', (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("sell", { loggedIn: req.session.loggedIn })
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