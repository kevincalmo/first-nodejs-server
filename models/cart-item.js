const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartitems', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        alloNull: false
    },
    quantity: Sequelize.INTEGER
});
module.exports = CartItem;