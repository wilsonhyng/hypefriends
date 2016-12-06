var express = require('express');
var request = require('request');
var Promise = require('bluebird');
var app = express();


var bodyParser = require('body-parser');


// Mongodb stuff
var mongooseConnection = require('./App/config.js');
var Friend = require('./App/Models/Friend.js');


// Path to help express serve public files
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.post('/addFriend', (req, res) => {
  // console.log('POST FROM CLIENT', req.body.data);
  var username = ({friend: req.body.data});
  // console.log(username);
  var url = 'https://api.hypem.com/v2/users/' + req.body.data + '/favorites?page=1&count=10&key=swagger';  

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // console.log('SEND THIS SHIT BACK');
      // console.log(JSON.parse(body));
      res.send(JSON.parse(body));

      Friend.findOne(username, (err, found) => {
        if (!found) {
          var newFriend = new Friend(username);
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
      console.log('No such username');
      res.send('error');
    }
  });
  // res.status(201).redirect('/');
});

app.post('/displayFriends', (req, res) => {

  Friend.find({}, function(err, friends) {
    var friendMap = {};

    friends.forEach(function(friend) {
      friendMap[friend._id] = friend;
    });

    if (friendMap !== {}) {
      res.send(friendMap);  
    } else {
      res.send('none');
    }
  });
});

module.exports = app;