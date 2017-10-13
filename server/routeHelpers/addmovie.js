const moviedb = require('../../helper/moviedb.js');

//this function will populate the seasons, episodes and runtime of episodes when a show is chosen to place into the schedule
module.exports = (req, res) => {
	const { id } = req.body;
	return moviedb.movieDetails(id)
	.then(data => {
		// console.log('data from addmovie: ', data);
		//refactor this to send only the data that's needed!!!!
		res.send(data);
	})
}