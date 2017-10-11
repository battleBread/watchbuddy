var handleTVdata = (data) => {
	console.log('popular shows', data);
	var top = JSON.parse(data).results.splice(0, 5);
	var array = [];
	top.forEach((el) => {
		var obj = {};
		obj.type = 'tv';
		obj.name = el.name;
		var arr = [];
		el.genre_ids.forEach((int) => {
			for (var i = 0; i < genres.length; i++) {
				if (genres[i].id === int){
					arr.push(genres[i].name)
				}
			}
		})
		obj.genres = arr
		obj.summary = el.overview;
		obj.firstAirDate = el.first_air_date;
		obj.image = "https://image.tmdb.org/t/p/w500/" + el.backdrop_path;
		obj.id = el.id
		array.push(obj)
	});	
	return array;
}

var handleMovieData = (data) => {
	console.log('popular shows', data);
	var top = JSON.parse(data).results.splice(0, 5);
	var array = [];
	top.forEach((el) => {
		var obj = {};
		obj.type = 'movie';
		obj.name = el.title; //THIS IS CHANGED
		var arr = [];
		el.genre_ids.forEach((int) => {
			for (var i = 0; i < genres.length; i++) {
				if (genres[i].id === int){
					arr.push(genres[i].name)
				}
			}
		})
		obj.genres = arr
		obj.summary = el.overview;
		obj.releaseDate = el.release_date;
		obj.image = "https://image.tmdb.org/t/p/w500/" + el.backdrop_path;
		obj.id = el.id
		array.push(obj)
	});	
	return array;
}

module.exports.handleTVdata = handleTVdata;
module.exports.handleMovieData = handleMovieData;

