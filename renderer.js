var express      = require('express'),
	Forms        = require('./models/forms'),
	EventEmitter = require('events').EventEmitter;

var Renderer = function(req, res){
	this.req  = req;
	this.res  = res;
	this.e    = new EventEmitter();
	this.p    = {
			'create_ancate' : {
				name : ''
			}
	}
}
Renderer.prototype.renderPage = function(body){
	this.res.render('index', {
		locals : {
			body : body
		}
	});
}

Renderer.prototype.getHtmlAllList = function(){
	var self = this;
	Forms.find({}, function(err, docs){
		var list = self.res.partial('ancates', {
			locals: {
				docs  : docs
			}
		})
		self.e.emit('getHtmlAllList', list);
	});
}

Renderer.prototype.getHtmlCreateAncate = function(){
	return this.res.partial('create_ancate', { locals : this.p.create_ancate });
}

module.exports = Renderer;