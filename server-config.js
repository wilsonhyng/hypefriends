var express = require('express');
var request = require('request');
var Promise = require('bluebird');
var app = express();


var bodyParser = require('body-parser');


// Mongodb stuff
var mongooseConnection = require('./App/config.js');
var Friend = require('./App/Models/Friend.js');


// Path to help express server public files
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



// handle a post request from client with username, use username to request api, on success, save username to database and render results to client 




app.post('/addFriend', (req, res) => {
  console.log(req.body.friend);
  var username = req.body;

  var url = 'https://api.hypem.com/v2/users/' + username.friend + '/favorites?page=1&count=10&key=swagger';  

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(JSON.parse(body));


      // don't add friends into data base if they are already in there

      // Friend.findAll

      Friend.find(username, (err, found) => {
        if (!found) {
          var newFriend = new Friend(username);
          console.log(me);
          newFriend.save((err, friend) => {
            if (err) {
              console.log(err);
            } 
            console.log('Friend saved!', friend);
          });
        } else {
          console.log('Friend already in database', username.friend);
        }
      });








    } else {
      console.log('No username');
      res.redirect('/');
      return;
    }
  });


  // res.status(201).redirect('/');
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