const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../database-mysql');
const moviedb = require('../helper/moviedb.js');
const utils = require('./hashUtils.js');
const routes = require('./routeHelpers/index.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

//This function is to retrieve the top 5 recommended shows from the MovieDB api for the front page of WatchBuddy.
app.get('/recommend', routes.recommend);

app.post('/:route', (req, res) => {
	console.log(req.params.route);
	routes[req.params.route](req, res);
});

// app.post('/update', function (req, res) {

// })


app.listen(process.env.PORT || 3000, ()  => {
  console.log(`listening on port ${3000}!`);
})











