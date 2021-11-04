const { User, Meme, Comments, Share } = require('../models');

// Transfer [amt] coins from [u1] to [u2].
const transferCoins = async (u1, u2, amt) => {
    if (u1.balance < amt) return false;
    u1.balance -= amt;
    u2.balance += amt;
}

// Transfers [amt] shares from [u1] to [u2] linked to the passed [meme].
const transferShares = (u1, u2, meme, amt) => {
    const sharePrice = meme.share_price;
    
}