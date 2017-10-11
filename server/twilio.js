const config = require('../config.js');
const accountSid = config.ACCOUNTSID;
const authToken = config.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

const sendReminder = (userNumber, userName, showName, callback) => {
console.log('sendReminder activated!');
client.messages
  .create({
    to: userNumber,
    from: config.TWILIONUMBER,
    body: `Hey ${userName}, This is Watch Potato. We are reminding you that you should watch ${showName} today on your free time! After you are done, please send us a rating (1-5)!`
    // mediaUrl: 'https://websitetoapicture.com/pic.jpg',
  })
  .then((message) => console.log(message.sid));
}

const askForRating = (userNumber, userName, showName, callback) => {
console.log('askForRating activated!');
client.messages
  .create({
    to: userNumber,
    from: config.TWILIONUMBER,
    body: `Hey ${userName}! How was ${showName}? We would love for you to send us back a rating between 1-5 for our database collections`
  })
  .then((message) => console.log(message.sid));
}


module.exports.sendReminder = sendReminder;
module.exports.askForRating = askForRating;


/* 
we want this function to send the user a notification at a specific
time to remind the user on when to watch the show.

after the alotted time of binge watching the show,
-we would like to ask the user what the rating of the episode was
-the user can respond with 1-5 with the rating and this will in turn
 update the shows rating on DB.

*/
// to field will be to user's number from database
// from field will be from our free trial twilio number
// body is the text that we want to show to the user
// mediaURL is the image we can send to the user as well
