const { User } = require('../../database-postgres');
const { Show, Movie, Event } = require('../../database-mongo');

module.exports = {
  GET: (req, res, username = req.params.username) => {
    User.findOne({ where: { username }})
      .then(({ dataValues: { id }}) => {
        console.log('found', username, id);
      });
  },
};