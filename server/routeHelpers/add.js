const moviedb = require('../../helper/moviedb.js');

//this function will populate the seasons, episodes and runtime of episodes when a show is chosen to place into the schedule
module.exports = {
	POST: (req, res) => {
		const { id } = req.body;
		moviedb.details(id, data => { 
			console.log('show data: ', data);
			const { seasons, episode_run_time } = JSON.parse(data);

			const obj = seasons.reduce((memo, el) => {
				if (el.season_number !== 0) {
					memo[el.season_number] = [el.episode_count, `https://image.tmdb.org/t/p/w500${el.poster_path}`];
				}
				return memo;
			}, {});

			res.send({
				seasons: obj,
				runtime: episode_run_time[0],
			});
		})
	},
}