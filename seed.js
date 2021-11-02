const sequelize = require("../config/connection");
const {User,Pet,Group} = require("../models")

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
    const petsData = await Pet.bulkCreate([
        {
            name:"Shiva",
            species:"cat",
            age:1,
            UserId:1
        },
        {
            name:"Bahamut",
            species:"cat",
            age:1,
            UserId:1
        },
        {
            name:"Bandit",
            species:"cat",
            age:4,
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
            description:"no normal pets here, monkeys or weirder",
        },
        
    ])
    groupsData[0].addUser(1)
    groupsData[0].addUser(2)
    userData[2].addGroups([2,3])
}

sequelize.sync({force:true}).then(()=>{
    seed();
})