const { Meme, Share, User, Transaction } = require('../models')

const transfer = (buyer, seller, amt) => {
    if (buyer.balance < amt) return false;

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
    if (!buyer || !meme) return;

    const shares = meme.shares;

    shares.forEach(async (share) => {
        const price = share.bought_price;
        if(tradeShares(buyer, share)) {
            await share.save();
            await share.user.save();
            await Transaction.create({
                buyer_id: buyer.id,
                seller_id: share.user.id,
                meme_id: share.meme_id,
                amount: price
            });
        }
    });

    await buyer.save();
}

module.exports = buyShares;