const Sequelize = require('sequelize');

module.exports.userSchema = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
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
  avatarUrl: {
    type: Sequelize.STRING,
  },
  notifications: {
    type: Sequelize.BOOLEAN,
  },
  bio: {
    type: Sequelize.STRING,
  }
};