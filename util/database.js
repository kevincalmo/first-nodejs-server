const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'admin', 'admin', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize;