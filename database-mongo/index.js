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
