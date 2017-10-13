const { twilio, message } = require('./twilio');
//Exports all route handlers as a single object
module.exports = {
  twilio,
  message,
  recommend: require('./recommend'),
  search: require('./search'),
  signup: require('./signup'),
  login: require('./login'),
  add: require('./add'),
  addshow: require('./addShow'),
  addmovie: require('./addmovie'),
  user: require('./user'),
};
