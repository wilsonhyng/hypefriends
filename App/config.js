var mongoose = require('mongoose');

var host = (process.env.DATABASE_URL || 'mongodb://localhost/HypeFriends');

mongoose.connect(host);


var mongooseConnection = mongoose;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
  console.log('Mongodb connection open');
});

module.exports = mongooseConnection;