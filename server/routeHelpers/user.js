const { User } = require('../../database-postgres');
const { Show, Movie, Event } = require('../../database-mongo');

module.exports = {
  GET: ({ params: { username }}, res) => {
    User.findOne({ where: { username }})
      .then(({ dataValues: { id }}) => {
        console.log('found', username, id);
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