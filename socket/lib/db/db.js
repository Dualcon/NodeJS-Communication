var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/IOTDB');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to Database.');
});

module.exports.createSessionStore = function(session) {
	//Connect-Mongo store:
	var MongoStore = require('connect-mongo')(session);
	this.sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
};

module.exports.getSessionStore = function() {
	return this.sessionStore;
};
