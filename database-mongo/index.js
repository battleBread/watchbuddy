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

// const testShow = new Show({
//   title: 'Breaking Bad',
//   rating: 5,
//   episodes: [{
//     title: 'Pilot',
//     rating: 4,
//     review: 'Good, but not as good as the show',
//     season: 1,
//     episode: 1,
//     runtime: 44,
//   }]
// });

// testShow.save(err => console.log(err));

// Show.find(err => console.log(err))
//   .then(shows => {
//     console.log('found: ', shows);
//     shows.map(show => {
//       console.log(show.episodes);
//       show.remove()
//     });
//   });

// const testEvent = new Event({title: 'A TEST'});

// testEvent.save(err => console.log(err));

// Event.find((err, events) => {
//   if (err) return console.log(err);
//   console.log('found events: ', events);
//   events.map(event => event.remove());
//   console.log('updated events: ', events);
// });