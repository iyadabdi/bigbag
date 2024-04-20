const Sequelize = require('sequelize');

const sequelize = new Sequelize('iyad', 'internetbag', 'elcamino', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log,
  freezeTableName: true,
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
