const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../database-mysql');
const moviedb = require('../helper/moviedb.js');
const utils = require('./hashUtils.js');
const routes = require('./routeHelpers');
const pg = require('../database-postgres');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/recommend', routes.recommend);

app.post('/:route', (req, res) => {
	console.log(req.params.route);
	routes[req.params.route](req, res);
});

app.listen(process.env.PORT || 3000, ()  => {
  console.log(`listening on port ${3000}!`);
})











=======
app.listen(process.env.PORT || 3000, ()  => {
  console.log(`listening on port ${3000}!`);
});
>>>>>>> Skeletons postgres db model
=======
app.listen(process.env.PORT || 3000, ()  => {
  console.log(`listening on port ${3000}!`);
});
>>>>>>> 6f614adcdedf05d599045226ce52802c4e4b6504
