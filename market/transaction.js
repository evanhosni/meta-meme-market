const { Meme, Share, User } = require('../models')

const transfer = (buyer, seller, amt) => {
    if (buyer.balance < amt) return false;

    console.log(seller);

    buyer.balance -= amt;
    seller.balance += amt;

    return true;
}

const tradeShares = (buyer, share) => {
    if (!transfer(buyer, share.user, share.bought_price)) return false; // share.user may be share.users (ARRAY)

    share.user_id = buyer.id;
    share.bought_price = null;
    share.listed_at = null;

    return true;
}

const buyShares = async (buyer, meme, amt) => {
    const shares = meme.shares;

    // console.log(share.user);    

    shares.forEach(async (share) => {
        tradeShares(buyer, share);
        await share.save();
        await share.user.save();
    });

    await buyer.save();
}

module.exports = buyShares;