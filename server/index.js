const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../database-mysql');
const moviedb = require('../helper/moviedb.js');
const utils = require('./hashUtils.js');
const routes = require('./routeHelpers');
const pg = require('../database-postgres');
const mdb = require('../database-mongo');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/user/:username', (req, res) => {
	routes.user.GET(req, res);
});

app.get('/:route', (req, res) => {
	console.log('GET to: ', req.params.route);
	routes[req.params.route].GET(req, res);
});

app.post('/user/:username', (req, res) => {
	routes.user.POST(req, res);
});

app.post('/:route', (req, res) => {
	console.log('POST to: ', req.params.route);
	routes[req.params.route].POST(req, res);
});

app.listen(process.env.PORT || 3000, ()  => {
  console.log(`listening on port ${3000}!`);
});
