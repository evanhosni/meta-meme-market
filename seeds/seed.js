const sequelize = require("../config/sequelize");
const { User, Meme, Share, Comments, Transaction } = require("../models")

const seed = async () => {

    const newUser = await User.bulkCreate([
        {
            username: "joe",
            email: "joe@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
        },
        {
            username: "louis",
            email: "louis@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
        },
        {
            username: "brett",
            email: "brett@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
        },
        {
            username: "michael",
            email: "michael@joe.joe",
            password: "password",  //'$2b$05$4C9TpL09IiPxekQ/T50ct.Oy0liVAgolrw1z6frO9Guz.NUoeeSey',
        },
    ], {
        individualHooks: true
    })

    const memesData = await Meme.bulkCreate([
        {
            img: "http://res.cloudinary.com/metamememarket/image/upload/v1636073098/jyjiuibeyoa9fnh0xnc0.jpg",
            title: "Meme1",
            number_shares: 100,
            share_price: 24.72,
            is_initial: true,
            created_at: 11 / 1 / 2021,
            user_id: 1
        },
        {
            img: "http://res.cloudinary.com/metamememarket/image/upload/v1636073215/iaorn68rpihycqqrw8ov.jpg",
            title: "Meme2",
            number_shares: 200,
            share_price: 22.88,
            is_initial: true,
            created_at: 11 / 1 / 2021,
            user_id: 1
        },
        {
            img: "https://res.cloudinary.com/metamememarket/image/upload/v1636267212/wes5fnwbtmkfzmmgwkk2.gif",
            title: "Meme3",
            number_shares: 300,
            share_price: 20.34,
            is_initial: false,
            created_at: 9 / 1 / 2021,
            user_id: 2
        },
        {
            img: "http://res.cloudinary.com/metamememarket/image/upload/v1636073138/vebfzozvokzg3ml7ewlj.png",
            title: "Meme4",
            number_shares: 400,
            share_price: 17.77,
            is_initial: true,
            created_at: 11 / 1 / 2021,
            user_id: 1
        },
        {
            img: "http://res.cloudinary.com/metamememarket/image/upload/v1636073239/uswmfj5ghldwe5vn3ut6.webp",
            title: "Meme5",
            number_shares: 500,
            share_price: 15.55,
            is_initial: true,
            created_at: 10 / 31 / 2021,
            user_id: 3
        },
        {
            img: "http://res.cloudinary.com/metamememarket/image/upload/v1636073281/jdevnpb5scawkahan3ac.png",
            title: "Meme6",
            number_shares: 9,
            share_price: 108.94,
            is_initial: false,
            created_at: 10 / 11 / 2021,
            user_id: 2
        },
        {
            img: "http://res.cloudinary.com/metamememarket/image/upload/v1636073423/ty5oxmkkjctoq54alugb.png",
            title: "Meme7",
            number_shares: 9,
            share_price: 108.94,
            is_initial: false,
            created_at: 10 / 11 / 2021,
            user_id: 2
        }
    ])

    const shareData = await Share.bulkCreate([
        {
            bought_price: 11,
            user_id: 1,
            meme_id: 6
        },
        {
            bought_price: 12,
            user_id: 2,
            meme_id: 5
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
        },
        {
            bought_price: 2,
            user_id: 3,
            meme_id: 3,
            listed_at: Date.now(),
            is_initial: true
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
    seed().catch(err => {

        console.log(err);
    });
})
