var express = require('express');
var request = require('request');
var app = express();


var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Mongodb stuff
var mongooseConnection = require('./App/config.js');
var Friend = require('./App/Models/Friend.js');


// Path to help express server public files
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));



// handle a post request from client with username, use username to request api, on success, save username to database and render results to client 




app.post('/addFriend', (req, res) => {
  console.log(req.body.friend);
  res.status(201).redirect('/');
});

app.get('/addFriend', (req, res) => {
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