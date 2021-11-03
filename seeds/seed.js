const sequelize = require("../config/sequelize");
const { User, Meme, Share, Comments } = require("../models")

const seed = async () => {

    const newUser = await User.bulkCreate([
        {
            username: "joe",
            email: "joe@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
            state_identification: 'joe123',
            bank_name: 'bank of america',
            account_number: 123456789,
            routing_number: 100000001
        },
        {
            username: "louis",
            email: "louis@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
            state_identification: 'louis123',
            bank_name: 'chase',
            account_number: 234567890,
            routing_number: 100000002
        },
        {
            username: "brett",
            email: "brett@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
            state_identification: 'brett123',
            bank_name: 'seafirst',
            account_number: 345678901,
            routing_number: 100000003
        },
        {
            username: "michael",
            email: "michael@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
            state_identification: 'michael123',
            bank_name: 'washington mutual',
            account_number: 456789012,
            routing_number: 100000004
        },
    ], {
        individualHooks: true
    })

    const memesData = await Meme.bulkCreate([
        {

            img: "https://res.cloudinary.com/metamememarket/image/upload/v1635878183/e4rkyhci8mnlniz8nj9b.jpg",
            title: "Meme1",
            number_shares: 100,
            share_price: 24.72,
            is_initial: true,
            created_at: 11 / 1 / 2021,
            user_id: 1
        },
        {
            img: "https://res.cloudinary.com/metamememarket/image/upload/v1635878163/w8miibcytqlp9go9tidn.jpg",
            title: "Meme2",
            number_shares: 200,
            share_price: 22.88,
            is_initial: true,
            created_at: 11 / 1 / 2021,
            user_id: 1
        },
        {
            img: "https://res.cloudinary.com/metamememarket/image/upload/v1635877853/wfszlgnzn5fo5skg00wy.png",
            title: "Meme3",
            number_shares: 300,
            share_price: 20.34,
            is_initial: false,
            created_at: 9 / 1 / 2021,
            user_id: 2
        },
        {
            img: "https://res.cloudinary.com/metamememarket/image/upload/v1635877832/zfms4sepxjc5xfpe07xp.png",
            title: "Meme4",
            number_shares: 400,
            share_price: 17.77,
            is_initial: true,
            created_at: 11 / 1 / 2021,
            user_id: 1
        },
        {
            img: "https://res.cloudinary.com/metamememarket/image/upload/v1635877509/pmmepebomj5cclqnhktk.jpg",
            title: "Meme5",
            number_shares: 500,
            share_price: 15.55,
            is_initial: true,
            created_at: 10 / 31 / 2021,
            user_id: 3
        },
        {
            img: "https://res.cloudinary.com/metamememarket/image/upload/v1635876315/w2hryq5hyswrxaflul9u.png",
            title: "Meme6",
            number_shares: 9,
            share_price: 108.94,
            is_initial: false,
            created_at: 10 / 11 / 2021,
            user_id: 2
        },
    ])

    const shareData = await Share.bulkCreate([
        {
            number_shares: 5,
            bought_price: 11,
            user_id: 1,
            meme_id: 6
        },
        {
            number_shares: 6,
            bought_price: 12,
            user_id: 2,
            meme_id: 5
        },
        {
            number_shares: 7,
            bought_price: 13,
            user_id: 3,
            meme_id: 4
        },
    ])

    const commentsData = await Comments.bulkCreate([
        {
            comment_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae necessitatibus perferendis animi sed temporibus quae ipsum sapiente nam ipsam, fugit in accusamus illo explicabo provident modi quam laboriosam ex est! Lorem ipsum dolor sit amet.',
            user_id: 4,
            meme_id: 2
        },
        {
            comment_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae necessitatibus perferendis animi sed temporibus quae ipsum sapiente nam ipsam, fugit in accusamus illo explicabo provident modi quam laboriosam ex est! Lorem ipsum dolor sit amet.',
            user_id: 1,
            meme_id: 5
        },
        {
            comment_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae necessitatibus perferendis animi sed temporibus quae ipsum sapiente nam ipsam, fugit in accusamus illo explicabo provident modi quam laboriosam ex est! Lorem ipsum dolor sit amet.',

            user_id: 3,
            meme_id: 4
        },
    ])
}

sequelize.sync({ force: true }).then(() => {
    seed().catch(err=>{

        console.log(err);
    });
})
