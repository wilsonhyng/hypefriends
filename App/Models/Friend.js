var mongoose = require('mongoose');
var Promise = require('bluebird');

var friendSchema = mongoose.Schema({ friend: 'string'});

var Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;