const utils = require('../hashUtils.js');
const { User } = require('../../database-postgres');

//This function will create a new row for the users table for new users.
module.exports = {
  POST: ({ body: { 
    username, 
    password,
    phone = '',
    avatarUrl = 'http://www.redgem.com.au/NEW/wp-content/uploads/2017/02/potato.jpg',
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
  },
};
