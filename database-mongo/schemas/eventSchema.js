const { Schema } = require('mongoose');

module.exports = Schema({
  title: String,
  start: Date,
  end: Date,
});