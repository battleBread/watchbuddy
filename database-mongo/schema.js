const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});

const showSchema = mongoose.Schema({
  title: String,
  movieDB: Number,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  episodes: [{
    title: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    season: Number,
    episode: Number,
    runtime: Number,
  }],
});

// const movieSchema = mongoose.Schema({

// });

module.exports = {
  eventSchema,
  showSchema,
};