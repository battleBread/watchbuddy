const request = require('request');
const config = require('../config.js');

/* Is this used?? */
let getInfoByTitle = (title, callback) => {
	let options = {
		url: `https://api.themoviedb.org/3/find/en/${title}?api_key=${config.TOKEN}&external_source=freebase_id`,
		headers: {
      'User-Agent': 'request'
    }
	}
	request(options, (err, res, body) => {
		callback(body)
	})
}

// let getMovieInfoByTitle = (title, callback) => {
//   let options = {
//     url: `https://api.themoviedb.org/3/find/en/${title}?api_key=${config.TOKEN}&external_source=freebase_id`,
//     headers: {
//       'User-Agent': 'request'
//     }
//   }
//   request(options, (err, res, body) => {
//     callback(body)
//   })
// }

let getPopularShows = (callback) => {
	let options = {
    url: `https://api.themoviedb.org/3/tv/popular?api_key=${config.TOKEN}&language=en-US&page=1`,
    headers: {
      'User-Agent': 'request'
    }
  }
	request(options, (err, res, body) => {
		callback(body)
	})
}

let getPopularMovies = (callback) => {
	let options = {
		url: `https://api.themoviedb.org/3/movie/popular?api_key=${config.TOKEN}&language=en-US&page=1`,
    headers: {
      'User-Agent': 'request'
    }
	}
  request(options, (err, res, body) => {
    callback(body)
  })
}

let genre = (callback) => {
	let options = {
		url: `https://api.themoviedb.org/3/genre/tv/list?api_key=${config.TOKEN}&language=en-US`,
		headers: {
			'User-Agent': 'request'
		}
	}
	request(options, (err, res, body) => {
		callback(body)
	})
}

let movieGenres = (callback) => {
  let options = {
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${config.TOKEN}&language=en-US`,
    headers: {
      'User-Agent': 'request'
    }
  }
}

let search = (title, callback) => {
	let options = {
		url: `https://api.themoviedb.org/3/search/tv?api_key=${config.TOKEN}&query=${title}&language=en-US&page=1`,
		headers: {
			'User-Agent': 'request'
		}
	}
	request(options, (err, res, body) => {
		callback(body)
	})
}

let searchMovies = (title, callback) => {
  let options = {
    url: `https://api.themoviedb.org/3/search/movie?api_key=${config.TOKEN}&query=${title}&language=en-US&page=1`,
    headers: {
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    callback(body)
  })
}


let details = (id, callback) => {
	let options = {
		url: `https://api.themoviedb.org/3/tv/${id}?api_key=${config.TOKEN}&language=en-US`,
		headers: {
			'User-Agent': 'request'
		}
	}
	request(options, (err, res, body) => {
		callback(body)
	})
}

let movieDetails = (id, callback) => {
  let options = {
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${config.TOKEN}&language=en-US`,
    headers: {
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    callback(body)
  })
}


let episode = (id, season, episode, callback) => {
	let options = {
		url: `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${config.TOKEN}&language=en-US`,
		headers: {
			'User-Agent': 'request'
		}
	}
	request(options, (err, res, body) => {
		if (err) {
			callback(err)
		} else {
			callback(body)
		}
	})
}

module.exports.getInfoByTitle = getInfoByTitle;
module.exports.getPopularShows = getPopularShows;
module.exports.genre = genre;
module.exports.search = search;
module.exports.details = details;
module.exports.episode = episode;