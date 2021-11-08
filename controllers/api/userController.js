const express = require('express');
const router = express.Router();
const { User, Meme, Comment } = require('../../models');
const bcrypt = require("bcrypt");

router.get('/add/:num', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("You must be logged in!");
    }
    User.findOne({
        where: { id: req.session.user.id },
        // attributes: ['balance']
    }).then(async (user) => {
        user.balance += req.params.num;
        await user.save();
        res.status(200).json({ balance: user.balance });
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/balance', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("You must be logged in to see your balance!");
    }
    User.findOne({
        where: { id: req.session.user.id },
        attributes: ['balance']
    }).then(user => {
        res.status(200).json({ balance: user.balance });
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Meme.findAll({
        where: {
            user_id: req.params.id
        },
        order: [
            ["created_at", "DESC"]
        ],
        attributes: ['img', 'number_shares', 'share_price']
    }).then(dbMemes => {
        if (dbMemes.length) {
            res.json(dbMemes);
        } else {
            res.status(404).json({ message: "No memes found for this user!" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err });
    });
});

router.get("/", (req, res) => {
    User.findAll({
        include: [Meme, Comments]
    }).then(dbUsers => {
        if (dbUsers.length) {
            res.json(dbUsers)
        } else {
            res.status(404).json({ message: "No users found!" })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err })
    })
});

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // state_identification: req.body.state_identification,
        // bank_name: req.body.bank_name,
        // account_number: req.body.account_number,
        // routing_number: req.body.routing_number
    }).then(newUser => {
        // req.session.save(()=>{
        //     req.session.loggedIn = true        
        // })
        req.session.user = {
            username: newUser.username,
            email: newUser.email,
            id: newUser.id
        }
        req.session.loggedIn = true
        res.json(newUser);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err })
    })
})

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(foundUser => {
        if (!foundUser) {
            req.session.destroy()
            res.status(401).json({ message: "incorrect email or password" })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.user = {
                    username: foundUser.username,
                    email: foundUser.email,
                    id: foundUser.id
                }
                req.session.loggedIn = true
                res.json(foundUser)
            } else {
                req.session.destroy()
                res.status(401).json({ message: "incorrect email or password" })
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser)
    })
})

module.exports = router;