const { Schema } = require('mongoose');

module.exports = Schema({
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