const sequelize = require("../config/connection");
const {User,Meme,Group} = require("../models")

const seed = async ()=>{
    const userData = await User.bulkCreate([
        {
            username:"joe",
            password:"password",
            email:"joe@joe.joe"
        },
        {
            username:"louis",
            password:"password",
            email:"louis@joe.joe"
        },
        {
            username:"brett",
            password:"password",
            email:"brett@joe.joe"
        },
        {
            username:"michael",
            password:"password",
            email:"michael@joe.joe"
        },
    ],{
        individualHooks:true
    })
    const memesData = await Meme.bulkCreate([
        {
            img:"Meme1",
            rating:8.5,
            value:1,
            UserId:1
        },
        {
            img:"Meme2",
            rating:4.2,
            value:1,
            UserId:1
        },
        {
            img:"Meme3",
            rating:6.0,
            value:4,
            UserId:2
        },
        {
            img:"Meme4",
            rating:2.2,
            value:1,
            UserId:1
        },
        {
            img:"Meme5",
            rating:9.6,
            value:1,
            UserId:1
        },
        {
            img:"Meme6",
            rating:5.0,
            value:4,
            UserId:2
        },
    ])
    const groupsData = await Group.bulkCreate([
        {
            name:"Multi-cat households",
            description:"How to take care of more than 1 cat!",
        },
        {
            name:"Pugs are the best!",
            description:"I love their squishy faces!",
        },
        {
            name:"Only Exotics!",
            description:"no normal memes here, monkeys or weirder",
        },
        
    ])
    groupsData[0].addUser(1)
    groupsData[0].addUser(2)
    userData[2].addGroups([2,3])
}

sequelize.sync({force:true}).then(()=>{
    seed();
})