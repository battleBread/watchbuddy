const { Schema } = require('mongoose');

module.exports = Schema({
  title: {
    type: String,
    required: true,
  },
  start: Date,
  end: Date,
});