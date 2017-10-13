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
  start: Date,
  end: Date,
});