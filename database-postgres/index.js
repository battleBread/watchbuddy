const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bs@localhost:5432/watchbuddy');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: Sequelize.STRING,
    unique: true,
  },
  salt: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.STRING,
  },
});
