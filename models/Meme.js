const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Meme extends Model {}

Meme.init({
  img:{
      type:DataTypes.STRING
  },
  rating:{
      type:DataTypes.DECIMAL
  },
  value:{
      type:DataTypes.INTEGER
  },
},{
    sequelize, 
});

module.exports=Meme