const { Meme, Share, User } = require('../models');
const { Op } = require('sequelize');

// Finds meme matching id including all shares currently listed.
async function getListedMeme(id) {
    const meme = await Meme.findByPk(id,
        {
        // attributes: ['img', 'title', 'share_price', 'number_shares', 'user_id'],
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Share,
            where: { [Op.not]: { listed_at: null } },
            attributes: ['id', 'is_initial', 'listed_at', 'bought_price', 'meme_id'],
            required: false
        }]
    });

    return meme;
}

// Get user by ID and all shares attached to meme with id memeId.
async function getUserShares(id, memeId) {
    const user = await User.findByPk(id,
        {
            include: {
                model: Share,
                where: {
                    meme_id: memeId
                },
                required: false,
            }
        });
    return user;
}

async function getStake(user, meme) {
    return (Math.round((user.shares.length / memeData.number_shares) * 100));
}

module.exports = { getListedMeme, getUserShares };