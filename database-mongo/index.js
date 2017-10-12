const mongoose = require('mongoose');
const { eventSchema } = require('./schema')

mongoose.connect('mongodb://localhost/watchpotato');

const Event = mongoose.model('Event', eventSchema);

module.exports = {
  Event,
};

// const testEvent = new Event({title: 'A TEST'});

// testEvent.save(err => console.log(err));

// Event.find((err, events) => {
//   if (err) return console.log(err);
//   console.log('found events: ', events);
//   events.map(event => event.remove());
//   console.log('updated events: ', events);
// });