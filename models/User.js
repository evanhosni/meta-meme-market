const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}

User.init({
    // add properites here, ex:
    username: {
         type: DataTypes.STRING,
         unique:true,
         validate:{
            isAlphanumeric:true
         }
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            // len:[8]
        }
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            // isEmail:true
        }
    }
},{
    hooks:{
        beforeCreate(newUser){
            newUser.username = newUser.username.toLowerCase();
            newUser.password = bcrypt.hashSync(newUser.password,5);
            return newUser;
        },
        beforeUpdate(updatedUser){
            updatedUser.username = updatedUser.username.toLowerCase();
            updatedUser.password = bcrypt.hashSync(updatedUser.password,5);
            return updatedUser;
        }
    },
    sequelize,
});

module.exports = User;