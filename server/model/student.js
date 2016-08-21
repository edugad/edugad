var mongoose = require('mongoose');

module.exports = mongoose.model('Student', mongoose.Schema({
	roll: {type: Number, required: true},
	name: {type: String, required: true},
	year: {type: Number, required: true},
	email: String,
	contact: String,
	active: {type: Boolean, default: false}
}, {collection: 'student'}));