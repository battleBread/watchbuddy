const { Schema } = require('mongoose');

const showSchema = Schema({
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

showSchema.methods.getEpisodes = () => {
  return this.episodes;
};

showSchema.methods.setEpisode = () => {

};

module.exports = showSchema;