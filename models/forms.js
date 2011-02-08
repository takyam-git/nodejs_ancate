var mongoose = require('mongoose');
var db       = mongoose.connect('mongodb://localhost:27017/nodejs_ancate'),
	Schema   = mongoose.Schema,
	objectId = Schema.objectId;

var Forms = new Schema({
	name         : { type: String, required: true },
	unpublish    : { type: Date,   required: true, default: 0 },
	created_on   : { type: Date,   required: true, default: Date.now }
});

Forms.pre('save', function(next){
	this.created_on = new Date();
	next();
});

//モデルの定義
mongoose.model('forms', Forms);
module.exports = db.model('forms');