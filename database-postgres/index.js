const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bs@localhost:5432/watchbuddy');

const User = sequelize.define('user', {
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
  avatar: {
    type: Sequelize.STRING,
  },
});

User.sync();

// User
//   .sync({force:true})
//   .then(() => User.create({
//     username: '3',
//     phone: '8675309',
//   }))
//   .then(() => User.findAll())
//   .then(users => console.log(users));
