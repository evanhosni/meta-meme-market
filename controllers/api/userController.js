const express = require('express');
const router = express.Router();
const {User,Meme,Group} = require('../../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    User.findAll({
        include:[Meme,Group]
    }).then(dbUsers=>{
        if(dbUsers.length){
            res.json(dbUsers)
        } else {
            res.status(404).json({message:"No users found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/",(req,res)=>{
    // const encryptedPassword = bcrypt.hashSync(req.body.password,3);
    User.create({
        username:req.body.username,
        // password:encryptedPassword,
        password:req.body.password,
        email:req.body.email
    }).then(newUser=>{
        res.json(newUser);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            req.session.destroy()
            res.status(401).json({message:"incorrect email or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    username:foundUser.username,
                    email:foundUser.email,
                    id:foundUser.id
                }
                res.json(foundUser)
            } else {
                req.session.destroy()
                res.status(401).json({message:"incorrect email or password"})
            }
        }
    }).catch(err=>{
         console.log(err);
        res.status(500).json(err);
    })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login")
})

router.delete("/:id",(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(delUser=>{
        res.json(delUser)
    })
})

module.exports = router;