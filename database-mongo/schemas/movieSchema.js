const { Schema } = require('mongoose');

module.exports = Schema({
  userId: {
    type: Number,
    required: true,
  },
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