const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});

// const showSchema = mongoose.Schema({
//   id: 
// });

// const movieSchema = mongoose.Schema({

// });

module.exports = {
  eventSchema,
};