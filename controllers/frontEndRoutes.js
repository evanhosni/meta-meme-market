const express = require('express');
const router = express.Router();
const { Meme, User } = require('../models');

//Homepage shows all memes sorted descending by created most recently
router.get("/", (req, res) => {
    Meme.findAll({
        order: [
            ["created_at", 'DESC']
        ],
        attributes: ['img','share_price','id'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    }).then(memeData => {
        const hbsMemes = memeData.map(meme => meme.get({ plain: true }))
        // res.json(hbsMemes)
        res.render("home", {
            ...hbsMemes, loggedIn: req.session.loggedIn, currentUser: req.session.user.username,
            memes: hbsMemes
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/meme/:id", (req, res) => {//TODO change id to title so it's "/meme/:title"
    // res.render("meme")
    Meme.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['img','share_price','number_shares','user_id'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    }).then(memeData => {
        console.log(memeData.toJSON())
        const hbsMeme = memeData.get({plain:true})
        // res.json(hbsMemes)
        res.render("meme", {
            ...hbsMeme, loggedIn: req.session.loggedIn, currentUser: req.session.user.username,
            meme: hbsMeme
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/user/:username", (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        },
        include: [{
            model: Meme,
            attributes: ['id','img','share_price','number_shares','user_id']
        }]
    }).then(userData => {
        console.log(userData.toJSON())
        const hbsUser = userData.get({plain:true})
        if(req.session.loggedIn && req.session.user.username == req.params.username) {
            res.render("user", {
                ...hbsUser, loggedIn: req.session.loggedIn, currentUser: req.session.user.username, sameUser: true,
                user: hbsUser
            })
        } else {
            res.render("user", {
                ...hbsUser, loggedIn: req.session.loggedIn, currentUser: req.session.user.username, sameUser: false,
                user: hbsUser
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/signup", (req,res)=>{
    if(req.session.user){
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
        res.render("upload", {loggedIn: req.session.loggedIn})
    }
})

router.get('/buy', (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("buy", {loggedIn: req.session.loggedIn})
    }
})

router.get('/sell', (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    } else {
        res.render("sell", {loggedIn: req.session.loggedIn})
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