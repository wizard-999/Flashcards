const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Flashcard = sequelize.define('Flashcard', {
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Flashcard;
