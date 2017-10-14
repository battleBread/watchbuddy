const { User } = require('../../database-postgres');
const { Show, Movie, Event } = require('../../database-mongo');
const Promise = require('bluebird');

module.exports = {
  GET: ({ params: { username }}, res) => {
    User.findOne({ where: { username }})
      .then(({ dataValues: { id }}) => {
        console.log('found', username, id);
        Promise.props({
          events: Event.find({ userId: id }).exec(),
          shows: Show.find({ userId: id }).exec(),
          movies: Movie.find({ userId: id }).exec(),
        }).then(result => console.log(result));
        res.send(JSON.stringify(id));
      });
  },
  POST: ({ body: { events = [], shows = [], movies = [] }, params: { username }}, res) => {
    User.findOne({ where: { username }})
      .then(({ dataValues: { id }}) => {
        console.log('found', username, id);
        console.log(`body: 
          events: ${JSON.stringify(events)}, 
          shows: ${JSON.stringify(shows)}, 
          movies: ${JSON.stringify(movies)}, `);
        res.send(JSON.stringify(id));
      });
  },
};