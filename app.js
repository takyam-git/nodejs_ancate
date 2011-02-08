
/**
 * Module dependencies.
 */

var express  = require('express'),
	mongoose = require('mongoose')
	Forms    = require('./models/forms');

//Server
var app = module.exports = express.createServer();

// Configuration
var $PORT = 3000;	//ポート番号設定

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', { layout: false });
	app.use(express.bodyDecoder());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
	var f = new Forms();
	f.name = 'hogehoge';
	f.save(function(err){
		if(!err){
			Forms.find({}, function(err, docs){
				res.render('index', {
					locals: {
						title: 'Express',
						docs: docs
					}
				});
			});
		}
	});
});

// Only listen on $ node app.js

if (!module.parent) {
	app.listen($PORT);
	console.log("Express server listening on port %d", app.address().port)
}