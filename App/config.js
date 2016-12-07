var mongoose = require('mongoose');


if (env === 'development') {
  mongoose.connect('mongodb://localhost/HypeFriends');
} else {
  mongoose.connect('mongodb://friends:wilson@ds127878.mlab.com:27878/hypefriends');
}


var mongooseConnection = mongoose;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
  console.log('Mongodb connection open');
});

module.exports = mongooseConnection;