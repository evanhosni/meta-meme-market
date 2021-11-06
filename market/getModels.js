const { Meme, Share, User } = require('../models');
const { Op } = require('sequelize');

async function getMeme(id) {
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

module.exports = { getMeme, getUserShares };