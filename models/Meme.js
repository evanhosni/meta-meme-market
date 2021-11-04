const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Meme extends Model { }

Meme.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // title: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true,//TODO unique per user?
    //     validate: {
    //         len: [4, 50]
    //     }
    // },
    number_shares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [2, 3]
        }
    },
    share_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    is_initial: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            // isDate:true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'user', key: 'id' }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'meme'
});

module.exports = Meme;