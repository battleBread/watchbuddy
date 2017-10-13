const moviedb = require('../../helper/moviedb.js');

//This function is to retrieve the top 5 recommended shows from the MovieDB api for the front page of WatchBuddy.
module.exports = {
  GET: (req, res) => {
    var tvGenres;
    var movieGenres;
    var array;
    return moviedb.genre()
    .then(data => {
      tvGenres = JSON.parse(data);
      return moviedb.movieGenres()
    })
    .then(data => {
      movieGenres = JSON.parse(data);
      return moviedb.getPopularShows();
    })
    .then((data) => {
      const top = JSON.parse(data).results.splice(0, 5);
      array = top.map(show => {
        const { name, id } = show;
        const arr = show.genre_ids.map(int => {
          for (var i = 0; i < tvGenres.genres.length; i++) {
            if (tvGenres.genres[i].id === int){
              return tvGenres.genres[i].name;
            }
          }
        });
        return ({
          name,
          id,
          genres: arr,
          summary: show.overview,
          firstAirDate: show.first_air_date,
          image: `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`,
        });
      });
      return moviedb.getPopularMovies()
    })
    .then((data) => {
      const top = JSON.parse(data).results.splice(0, 5);
      var movieArray = top.map(movie => {
        // console.log(movie);
        const { title, id } = movie;
        const arr = movie.genre_ids.map(int => {
          for (var i = 0; i < movieGenres.genres.length; i++) {
            if (movieGenres.genres[i].id === int){
              return movieGenres.genres[i].name;
            }
          }
        });
        return ({
          name: title,
          id,
          genres: arr,
          summary: movie.overview,
          firstAirDate: movie.release_date,
          image: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        });
      });
      // array = array.concat(movieArray);
      // res.send(array);
      var responseObj = {
        tv: array,
        movie: movieArray
      }
      res.send(responseObj)
    })
  },
};