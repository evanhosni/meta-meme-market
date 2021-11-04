const User = require("./User");
const Meme = require("./Meme");
const Comments = require("./Comments");
const Share = require("./Share");
const Transaction = require('./Transaction');

User.hasMany(Meme);
User.hasMany(Share);
User.hasMany(Comments);
User.hasMany(Transaction);
User.hasMany(Transaction, { as: 'Buyer', foreignKey: 'buyer_id' });
User.hasMany(Transaction, { as: 'Seller', foreignKey: 'seller_id' });

Meme.hasMany(Share);
Meme.hasMany(Comments);
Meme.hasMany(Transaction);
Meme.belongsTo(User);

Share.belongsTo(User);
Share.belongsTo(Meme);

Comments.belongsTo(User);
Comments.belongsTo(Meme);

Transaction.belongsTo(User);
Transaction.belongsTo(Meme);

module.exports = {
    User,
    Meme,
    Comments,
    Share,
    Transaction
};