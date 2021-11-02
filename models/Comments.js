const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' }
    },
    meme_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'post', key: 'id' }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
})

module.exports = Comment