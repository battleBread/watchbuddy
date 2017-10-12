const db = require('../../database-mysql');
const utils = require('../hashUtils.js');
const { User } = require('../../database-postgres');

//This function will create a new row for the users table for new users.
<<<<<<< HEAD
module.exports = ({ body: { 
  username, 
  password,
  phone,
  avatarUrl,
}}, res) => {
  //TODO: refactor to new DB schema
  // const { 
  //   username, 
  //   password,
  //   phone,
  //   avatarUrl,
  // } = req.body;
  console.log('RECEIVED', username, password, phone, avatarUrl);
  const salt = utils.createRandom32String(); // create salt
  const pw = utils.createHash(password, salt);
  const array = [username, pw, salt];

  User.create(({
    username,
    phone,
    avatarUrl,
    salt,
    password: pw,
  }))
    .then(() => res.send(username))
    .catch(err => console.log('Error creating user: ', err));

  // db.createUser(array, (data) => {
  //    res.send(username);
  // });

  db.createUser(array, (data) => {
     res.send(username);
  });
}
