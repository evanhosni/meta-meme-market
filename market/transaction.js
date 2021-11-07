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
    let buyCount = 0;
    let totalCost = 0

    const shares = meme.shares;

    for (const share of shares) {
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
            buyCount++;
            totalCost += price;
        }
    }

    await buyer.save();

    console.log(buyCount, totalCost)

    return { buyCount, totalCost };
}

module.exports = { buyShares };