var express = require('express');
var request = require('request');
var Promise = require('bluebird');
const env = require('get-env')();
var app = express();
var bodyParser = require('body-parser');
var engines = require('consolidate');

// Mongodb stuff
var mongooseConnection = require('./App/config.js');
var Friend = require('./App/Models/Friend.js');



// Path to help express serve public files
var path = require('path');

app.use(express.static(path.join(__dirname, 'client')));



app.set('views', __dirname + './client');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/', function(req, res) {
  res.render('./client/index.html');
});

app.post('/addFriend', (req, res) => {
  var username = ({friend: req.body.data});
  var url = 'https://api.hypem.com/v2/users/' + req.body.data + '/favorites?page=1&count=10&key=swagger';  

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.status(200).send(JSON.parse(body));

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
      res.status(404).send('error');
    }
  });
});

app.post('/displayFriends', (req, res) => {
  Friend.find({}, function(err, friends) {
    var friendMap = {};

    friends.forEach(function(friend) {
      friendMap[friend._id] = friend;
    });

    if (friendMap !== {}) {
      res.status(200).send(friendMap);  
    } else {
      res.status(404).send('none');
    }
  });
});

module.exports = app;