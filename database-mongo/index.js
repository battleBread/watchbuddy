const mongoose = require('mongoose');
const {
  eventSchema,
  showSchema,
  movieSchema,
} = require('./schemas');

mongoose.connect('mongodb://localhost/watchpotato');

const Event = mongoose.model('Event', eventSchema);
const Show = mongoose.model('Show', showSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
  Event,
  Show,
  Movie,
};

const simpsons = new Show({
  title: 'The Simpsons',
  userId: 3,
  rating: 5,
  episodes: [
    {
    title: 'Pilot',
    season: 1,
    episode: 1,
    },
    {
      title: 'Homer vs. New York',
      season: 9,
      episode: 6,
    },
    {
      title: 'Pilot',
      season: 1,
      episode: 1,
    },
  ]
});

/**
 * ////////////////////////
 * // MONGO INSTRUCTIONS //
 * ////////////////////////
 * 
 * You must have MongoDB installed and running on your local machine for this to work.
 * For installation instructions @see https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
 * For cloud-based DB implementation @see https://www.mongodb.com/cloud/atlas
 * 
 * Otherwise, start a local server with $ mongod or $ sudo mongod
 */
