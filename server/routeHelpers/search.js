const moviedb = require('../../helper/moviedb.js');

//This function will search for the top 10 results when inputting a term into the MovieDB api.
module.exports = (req, res) => {
	console.log(req.body.term);
	var title = req.body.term;
	var genres;
	return moviedb.genre()
	.then(data => {
		console.log('genres', data)
		genres = JSON.parse(data).genres;
		moviedb.search(title, data => {
			console.log(data);
			var searched = JSON.parse(data).results.splice(0, 10);
			var array = searched.map(el => {
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
			res.send(array);
		})
	})
}