const express = require('express');
const router = express.Router();
const {Meme,User} = require('../models');

router.get("/",(req,res)=>{
    Meme.findAll({
        order:["UserId"],
        include:[User]
    }).then(memeData=>{

        const hbsMemes = memeData.map(meme=>meme.get({plain:true}))
        // res.json(hbsMemes)
        res.render("home",{
            memes:hbsMemes
        })
    })
})

router.get("/upload",(req,res)=>{
    res.render("upload")
})

router.get("/profile",(req,res)=>{
    // if(!req.session.user){
    //     return res.redirect("/login")
    // }
    // User.findByPk(req.session.user.id,{
    //     include:[Meme]
    // }).then(userData=>{
    //     const hbsUser = userData.get({plain:true});
        res.render("profile"/*,hbsUser*/)
    // })
})

router.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = router;