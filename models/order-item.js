const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const orderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        alloNull: false
    },
    quantity: Sequelize.INTEGER
});
module.exports = orderItem;