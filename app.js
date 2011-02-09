
/**
 * Module dependencies.
 */

var express      = require('express'),
	mongoose     = require('mongoose'),
	Forms        = require('./models/forms'),
	Renderer     = require('./renderer'),
	EventEmitter = require('events').EventEmitter;

//Server
var app = module.exports = express.createServer();

// Configuration
var $PORT = 3000;	//ポート番号設定

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
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
	var r = new Renderer(req, res);
	r.renderPage(r.getHtmlCreateAncate());
});

app.post('/create_ancate', function(req, res){
	var r = new Renderer(req, res);

	//name が未入力だった場合
	if( req.body.name == '' ){
		r.renderPage(r.getHtmlCreateAncate());
	}

	var f = new Forms();
	f.name = req.body.name;
	f.save(function(err){
		if(!err){
			r.e.on('getHtmlAllList', function(list){
				r.renderPage(r.getHtmlCreateAncate() + list);
			});
			r.getHtmlAllList();
		}
	})
});

// Only listen on $ node app.js
if (!module.parent) {
	app.listen($PORT);
	console.log("Express server listening on port %d", app.address().port)
}