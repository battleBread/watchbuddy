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
    max: 5
  },
  review: String,
  runtime: Number,
});