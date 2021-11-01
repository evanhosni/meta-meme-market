const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Share extends Model { }

Share.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    number_shares:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    bought_price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'user', key: 'id' }
    },
    meme_id: {
        type: DataTypes.INTEGER,
        references: { model: 'meme', key: 'id' }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'share'
});

module.exports = Share;