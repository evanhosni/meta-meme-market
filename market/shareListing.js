var CronJob = require('cron').CronJob;
const { Meme } = require('../models/Meme');

async function checkIncubating() {
    try {
        const incubating = await Meme.findAll({ where: { is_initial: true } });
        incubating.forEach(meme => {
            const publicDate = new Date(meme.created_at); // Replace with date created row name.
            publicDate.setDate(publicDate.getDate() + 1);

            if (Date(meme.created_at) < Date.now()) {
                meme.update({ is_initial: false });
                // Add 'go public.'
            } else {
                const job = new CronJob(publicDate, () => {
                    meme.update({ is_initial: false });
                    // Add 'go public'.
                    job.stop();
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
}

/*
Track: % of meme owned
# of shares - retrieving the number of shares owned when visiting a page
selling shares - getting input from form 
*/