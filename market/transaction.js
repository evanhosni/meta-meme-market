const { Meme, Share, User } = require('../models')

const transfer = (buyer, seller, amt) => {
    if (buyer.balance < amt) return false;

    buyer.balance -= amt;
    seller.balance += amt;

    return true;
}

const tradeShares = async (buyer, share) => {
    if (!transfer(buyer, share.user, price)) return false; // share.user may be share.users (ARRAY)

    share.user_id = buyer.id;
    share.bought_price = null;
    share.listed_at = null;
}

const buyShares = async (buyer, meme, amt) => {
    const shares = await Share.findAll({
        where: {
            meme_id: meme.id,
        },
        order: [
            ['bought_price', 'ASC'],
            ['listed_at', 'ASC']
        ],
        include: [User],
        limit: amt
    });

    shares.forEach(async (share) => {
        if(await tradeShares(buyer, share)) {
            await share.save();
            await buyer.save();
        }
    });
}

module.exports = buyShares;