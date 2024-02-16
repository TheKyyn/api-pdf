const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const PDF = sequelize.define('PDF', {
    filename: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE
});

module.exports = PDF;
