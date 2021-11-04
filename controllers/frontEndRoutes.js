const express = require('express');
const router = express.Router();
const { Meme, User, Share } = require('../models');

//Homepage shows all memes sorted descending by created most recently
router.get("/", (req, res) => {
    Meme.findAll({
        order: [
            ["created_at", 'DESC']
        ],
        attributes: ['img','share_price'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    }).then(memeData => {
        const hbsMemes = memeData.map(meme => meme.get({ plain: true }))
        // res.json(hbsMemes)
        res.render("home", {
            memes: hbsMemes
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/meme/:id", (req, res) => {
    // res.render("meme")
    Meme.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['img','share_price','number_shares'],
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Share,
            where: { is_initial: true },
            attributes: ['id', 'is_initial', 'listed_at', 'bought_price', 'meme_id']
        }]
    }).then(memeData => {
        console.log(memeData.toJSON())
        const hbsMeme = memeData.get({plain:true})
        // res.json(hbsMemes)
        res.render("meme", {
            meme: hbsMeme
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//Renders login page unless already logged in
router.get("/login", (req, res) => {
    if (!req.session.user) {
        res.render("login")
    } else {
        return res.redirect("/profile")
    }
})

router.get("/upload", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("upload")
    }
})

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[Meme]
        }).then(userData=>{
            const hbsUser = userData.get({plain:true});
            res.render("profile",hbsUser)
        })
    }
})

// router.get('/buy/:id', (req, res) => {
//     if (!req.session.user) {
//         return res.redirect("/login")
//     } else {
//         res.render("buy")
//     }
// })

router.get('/sell', (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("sell")
    }
})

router.get('/logout', (req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

router.get('*', (req,res)=>{
    res.redirect('/')
})

module.exports = router;