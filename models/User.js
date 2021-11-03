const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require("bcrypt");

class User extends Model { }

User.init({
    // add properites here, ex:
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // isAlphanumeric: true,
            len: [4,30]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            // isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len:[8],
            // isAlphanumeric:true
        }
    },
    state_identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    routing_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [9.9]
        }
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        },
        defaultValue: 10
    }
}, {
    hooks: {
        beforeCreate(newUser) {
            newUser.username = newUser.username.toLowerCase();
            newUser.password = bcrypt.hashSync(newUser.password, 5);
            newUser.account_number = newUser.account_number.toString();
            newUser.account_number = bcrypt.hashSync(newUser.account_number, 5);
            return newUser;
        },
        beforeUpdate(updatedUser) {
            updatedUser.username = updatedUser.username.toLowerCase();
            updatedUser.password = bcrypt.hashSync(updatedUser.password, 5);
            updatedUser.account_number = updatedUser.account_number.toString();
            updatedUser.account_number = bcrypt.hashSync(updatedUser.account_number, 5);
            return updatedUser;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;