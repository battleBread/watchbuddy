const Sequelize = require('sequelize');
const { userSchema } = require('./schema');

const sequelize = new Sequelize('postgres://bs@localhost:5432/watchbuddy');

const User = sequelize.define('user', userSchema);

User.sync();

// User
//   .sync({force:true})
//   .then(() => User.create({
//     username: '3',
//     phone: '8675309',
//   }))
//   .then(() => User.findAll())
//   .then(users => console.log(users));

module.exports = {
  User
};