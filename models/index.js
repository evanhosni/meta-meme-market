const User = require("./User");
const Meme = require("./Meme");
const Group = require("./Group");

User.hasMany(Meme,{
    onDelete:"CASCADE"
});
Meme.belongsTo(User);

User.belongsToMany(Group,{
    through:"UserGroup"
})

Group.belongsToMany(User,{
    through:"UserGroup"
})

module.exports={
    User,
    Meme,
    Group
};