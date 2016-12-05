var mongoose = require('mongoose');
// var Friend = require('./Models/Friend.js');

mongoose.connect('mongodb://localhost/HypeFriends');

var mongooseConnection = mongoose;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
  console.log('Mongodb connection open');
});





// var me = new Friend({friend: 'wily6'});
// console.log(me);
// me.save((err, friend) => {
//   if (err) {
//     console.log(err);
//   } 
//   console.log('Friend saved!');
// });








module.exports = mongooseConnection;