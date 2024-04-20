const Sequelize = require('sequelize');
const sequelize = require('../database');  // Adjust the path as necessary

const Product = sequelize.define('product', {
    name: Sequelize.STRING,
    price: Sequelize.STRING,
    url: Sequelize.STRING,
    user_id: Sequelize.STRING  // To differentiate between users
});

module.exports = Product;
