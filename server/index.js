const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../database-mysql');
const moviedb = require('../helper/moviedb.js');
const utils = require('./hashUtils.js');
const routes = require('./routeHelpers/index.js');
const twilio = require('./twilio.js')

const app = express();

//this will need to be refactored once the DB is set in place.

app.use(bodyParser.urlencoded({ extended: false}));
//the above line is required to getting the text from user
app.post('/twilio', function(req,res) {
	console.log('twilio called from server');
  let number = '+1234567890';
  let name = 'Devon';
  let showName = 'How I Met Your Mother';
  // let number = num;
  // let name = name;
  // let showName = show;
  //sends out the reminder to user about watching show
  	//console.log('twilio clicked');
  //twilio.sendReminder(number, name, showName);
  console.log(`Hey ${name}, we texted you at ${number}, this is a reminder to watch ${showName}!`);
  //sends a txt asking for a rating for the show
  setTimeout(function(){
  	//twilio.askForRating(number, name, showName);
  	console.log(`Hey ${name}, We hoped you enjoyed ${showName}! What would you rate the show?`);
  }, 60000)
  res.send('Sent User text reminder of their show and will ask for rating in 60 seconds');
})

app.post('/message', function (req, res) {
	//this is the users phone number, we can match this with name in DB
	var msgFrom = req.body.From;
	//this is the body of the txt message sent back
	var msgBody = req.body.Body;
	console.log('server received a text from twilio reply: ', req.body.Body);
//currently not working correctly but it does send a reply
	res.send(`
		<Response>
			<Message>
				Hey there ${msgFrom}. Thank you very much for your rating of ${msgBody}. We have updated our databases with your latest review!
			</Message>
		</Response>	
		`);
});	




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










