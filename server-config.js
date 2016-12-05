var express = require('express');
var request = require('request');
var app = express();

// Mongodb stuff
var mongooseConnection = require('./App/config.js');
var Friend = require('./App/Models/Friend.js');


// Path to help express server public files
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));





app.get('/cool', (req, res) => {
  console.log('hello');
  var me = new Friend({friend: 'wily8'});
  console.log(me);
  me.save((err, friend) => {
    if (err) {
      console.log(err);
    } 
    console.log('Friend saved!');
  });
  res.status(201).redirect('/');
});


// var me = new Friend({friend: 'wily7'});
// console.log(me);
// me.save((err, friend) => {
//   if (err) {
//     console.log(err);
//   } 
//   console.log('Friend saved!');
// });




module.exports = app;