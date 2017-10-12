// // import request from 'superagent'
// const request = require('superagent')

// let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
// const CALENDAR_ID = 'tb8ckdrm61bdsj6jfm7khob4u5@group.calendar.google.com'
// const API_KEY = 'AIzaSyAOuDzSlG24RPBn3OKVAyjW3OK_EJhCUbp'
// const CLIENT_ID = '36715810384-o7sedl5mq1ev11fhbjcjt5oacep7jek9.apps.googleusercontent.com';
// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
// const authorizeButton = document.getElementById('authorize-button');
// const signoutButton = document.getElementById('signout-button');


// module.exports = getEvents (req, res) => {
//     request
//     .get(url)
//     .end((err, resp) => {
//       if (!err) {
//         // create array to push events into
//         const events = []
//         // in practice, this block should be wrapped in a try/catch block, 
//         // because as with any external API, we can't be sure if the data will be what we expect
//         JSON.parse(resp.text).items.map((event) => {
//           events.push({
//             // an event from Google Calendar can be a full day event or a regular one
//             start: event.start.date || event.start.dateTime,
//             end: event.end.date || event.end.dateTime,
//             title: event.summary,
//           })
//         })
//         callback(events)
//       }
//     })
// }