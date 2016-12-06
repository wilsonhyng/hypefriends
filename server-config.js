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



// handle a post request from client with username, use username to request api, on success, save username to database and render results to client 




app.post('/addFriend', (req, res) => {
  // console.log('POST FROM CLIENT', req.body.data);
  var username = {friend: req.body.data};
  console.log(username);
  var url = 'https://api.hypem.com/v2/users/' + req.body.data + '/favorites?page=1&count=10&key=swagger';  

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log('SEND THIS SHIT BACK');
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