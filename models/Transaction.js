const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

class Transaction extends Model { }

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    buyer_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    meme_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'meme',
            key: 'id'
        }
    },
    amount:{
        type: DataTypes.INTEGER,
        validate:{
            isNumeric: true
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction'
});

module.exports = Transaction;