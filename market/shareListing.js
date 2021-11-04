var CronJob = require('cron').CronJob;
const { Meme, Share } = require('../models');

// async function checkIncubating() {
//     try {
//         const incubating = await Meme.findAll({ where: { is_initial: true } });
//         incubating.forEach(meme => {
//             const publicDate = new Date(meme.created_at); // Replace with date created row name.
//             publicDate.setDate(publicDate.getDate() + 1);

//             if (Date(meme.created_at + 1) < Date.now()) {
//                 meme.update({ is_initial: false });
//                 // Add 'go public.'
//             } else {
//                 const job = new CronJob(publicDate, () => {
//                     meme.update({ is_initial: false });
//                     // Add 'go public'.
//                     job.stop();
//                 });
//             }
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

const sellShares = async (seller, price) => {
    // console.log(seller);
    const shares = seller.shares;

    for (share of shares) {
        share.listed_at = Date.now();
        share.bought_price = price;
        await share.save();
    }
}

function IPO(seller, meme, amt, price) {
    const toCreate = [];

    for (let i = 0; i < amt; i++) {
        toCreate.push({
            listed_at: null,
            bought_price: price,
            is_initial: false,
            user_id: seller,
            meme_id: meme.id
        });
        toCreate.push({
            listed_at: Date.now(),
            bought_price: price,
            is_initial: true,
            user_id: seller,
            meme_id: meme.id
        });
    }

    Share.bulkCreate(toCreate)
    .then(created => {
        console.log(created)
    })
    .catch(err => console.error(err));
}
/*
Track: % of meme owned
# of shares - retrieving the number of shares owned when visiting a page
selling shares - getting input from form 
*/

module.exports = { IPO, sellShares };