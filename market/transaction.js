const { Meme, Share, User, Transaction } = require('../models')

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
    if (!buyer || !meme) return; // if meme or buyer not found

    const shares = meme.shares;

    // console.log(meme);

    shares.forEach(async (share) => {
        // console.log(share);
        if(tradeShares(buyer, share)) {
            console.log('SAVING SHARES');
            await share.save();
            await share.user.save();
            await Transaction.create({
                buyer_id: buyer.id,
                seller_id: share.user.id,
                amount: share.bought_price
            })
        }
    });

    await buyer.save();
}

const sellShares = async (seller, shares, amt) => {
    const shares = sel
}

module.exports = buyShares;