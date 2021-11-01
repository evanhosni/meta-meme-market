const User = require("./User");
const Meme = require("./Meme");
const Comments = require("./Comments");
const Share = require("./Share");

User.hasMany(Meme);
User.hasMany(Share);
User.hasMany(Comments);

// User.hasMany(Comments)
Meme.hasMany(Share);
Meme.hasMany(Comments);
Meme.belongsTo(User);

Share.belongsTo(User);
Share.belongsTo(Meme);

Comments.belongsTo(User);
Comments.belongsTo(Meme)

// User.belongsToMany(Group,{
//     through:"UserGroup"
// })

// Group.belongsToMany(User,{
//     through:"UserGroup"
// })

module.exports={
    User,
    Meme,
    Comments,
    Share
};