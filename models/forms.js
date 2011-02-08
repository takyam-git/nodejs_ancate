var mongoose = require('mongoose');
var db       = mongoose.connect('mongodb://localhost:27017/nodejs_ancate'),
	Schema   = mongoose.Schema,
	objectId = Schema.objectId;

var Values = new Schema({
	value     : { type: String, required: true },
	posted_on : { type: Date,   required: true }
});
Values.pre('save', function(next){
	this.posted_on = new Date();
	next();
});

var Fields = new Schema({
	name     : { type: String, required: true },
	type     : { type: Number, required: true },
	added_on : { type: Date,   required: true },
	values   : [ Values ],
});
Fields.pre('save', function(next){
	this.added_on = new Date();
	next();
});

var Forms = new Schema({
	name       : { type: String, required: true },
	unpublish  : { type: Date,   required: true, default: 0 },
	created_on : { type: Date,   required: true, default: Date.now },
	fields     : [ Fields ]
});

Forms.pre('save', function(next){
	this.created_on = new Date();
	next();
});

//モデルの定義
mongoose.model('forms', Forms);
module.exports = db.model('forms');