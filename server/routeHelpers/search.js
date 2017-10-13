const moviedb = require('../../helper/moviedb.js');

//This function will search for the top 10 results when inputting a term into the MovieDB api.
module.exports = {
  POST: (req, res) => {
    console.log(req.body.term);
    var title = req.body.term;
    var genres;
    var movieGenres;
    var array;
    var movieArray;
    return moviedb.genre()
    .then(data => {
      console.log('genres', data)
      genres = JSON.parse(data).genres;
      // return moviedb.search(title)
      return moviedb.movieGenres()
    })
    .then(data => {
      movieGenres = JSON.parse(data).genres;
      return moviedb.search(title)
    })
    .then(data => {
      console.log(data);
      var searched = JSON.parse(data).results.splice(0, 10);
      array = searched.map(el => {
        const { name, id } = el;
        const arr = el.genre_ids.reduce((memo, int) => {
          genres.filter(genre => genre.id === int).map(genre => memo.push(genre.name));
          return memo;
        }, []);

        return ({
          name,
          id,
          genres: arr,
          summary: el.overview,
          firstAirDate: el.first_air_date,
          image: `https://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
        });
      });
<<<<<<< HEAD
    });
    // res.send(array);
    return moviedb.searchMovies(title)
  })
  .then(data => {
    var searched = JSON.parse(data).results.splice(0, 10);
    // console.log('first movie: ', searched[0]);
    movieArray = searched.map(movie => {
      // console.log(movie);
      const { title, id } = movie;
      const arr = movie.genre_ids.map(int => {
        for (var i = 0; i < movieGenres.length; i++) {
          if (movieGenres[i].id === int){
            return movieGenres[i].name;
=======
      // res.send(array);
      return moviedb.searchMovies(title)
    })
    .then(data => {
      var searched = JSON.parse(data).results.splice(0, 10);
      movieArray = searched.map(movie => {
        // console.log(movie);
        const { title, id } = movie;
        const arr = movie.genre_ids.map(int => {
          for (var i = 0; i < movieGenres.length; i++) {
            if (movieGenres[i].id === int){
              return movieGenres[i].name;
            }
>>>>>>> Refactors routes to be dynamic wrt get and post requests, not just post
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