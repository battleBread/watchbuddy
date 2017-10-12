const { Schema } = require('mongoose');

module.exports = Schema({
  title: {
    type: String,
    required: true,
  },
  movieDB: Number,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  episodes: [{
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    season: {
      type: Number,
      required: true,
    },
    episode: {
      type: Number,
      required: true,
    },
    runtime: Number,
  }],
});