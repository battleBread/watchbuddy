const db = require('../../database-mysql');
const moviedb = require('../../helper/moviedb.js');
const moment = require('moment');

//this function will add show information to the user's database as well as return the information for the current and next episode. This will also return the number of remaining episodes.
module.exports = {
	POST: (req, res) => {
		var array = [];
		for (var x in req.body){
			if (x !== 'username' && x !== 'showName') {
				if (x === 'startDate') {
					console.log(req.body[x])
					if (req.body[x] === ''){
						var current = JSON.stringify(moment()).substr(1, 10);
						array.push(current)
					} else {
						var start = req.body[x].substr(0, 10);
						array.push(start)
					}
				} else if (x === 'endDate'){
					var end = req.body[x].substr(0, 10);
					array.push(end)
				} else {
					array.push(req.body[x]);
				}
			}
		}
		array.push(req.body.username);
		db.addSurveyData(array, (data) => {
			var titleId = array[0];
			var season = array[1];
			var episode = array[2];
			var title = req.body.showName
			var object = {};
			moviedb.details(titleId, (data) => {
				var seasons = JSON.parse(data).seasons
				var episodes = 0;
				seasons.forEach((el) => {
					console.log(el)
					if (el.season_number >= season) {

						episodes = episodes + el.episode_count
					}
				})
				episodes = episodes - episode + 1
				object.episodesLeft = episodes;
				moviedb.episode(titleId, season, episode, (data) => {
					if (JSON.parse(data).status_code !== 34){	
						var info = JSON.parse(data)
						var first = [];
						first.push(title, info.season_number, info.episode_number, info.name, info.overview);
						first.push("https://image.tmdb.org/t/p/w500" + info.still_path)
						object.first = first;
						episode++;
						moviedb.episode(titleId, season, episode, (data) => {
							if (JSON.parse(data).status_code === 34){
								season++;
								episode = 1;
								moviedb.episode(titleId, season, episode, (data) => {
									if (JSON.parse(data).status_code === 34){
										object.second = 'finished';
										console.log(object)
										res.send(object)
									} else {
										var info = JSON.parse(data)
										var second = [];
										second.push(title, info.season_number, info.episode_number, info.name, info.overview);
										second.push("https://image.tmdb.org/t/p/w500" + info.still_path)
										object.second = second;
										console.log(object)
										res.send(object)
									}
								})
							} else {
								var info = JSON.parse(data)
								var second = [];
								second.push(title, info.season_number, info.episode_number, info.name, info.overview);
								second.push("https://image.tmdb.org/t/p/w500" + info.still_path)
								object.second = second;
								console.log(object)
								res.send(object)
							}
						})
					} else {
						res.send('That episode has not aired yet')
					}
				})
			})
		})
	},
};