var mongoose = require('mongoose');

module.exports = mongoose.model('Batch', mongoose.Schema({
	code: String,
	label: {type: String, required: true},
	year: {type: Number, required: true},
	active: {type: Boolean, default: true},
	students: [String],
	attendances: [{
		year: Number, 
		month: Number, 
		date: Number, 
		hrFrom: Number, 
		minFrom: Number, 
		hrTo: Number, 
		minTo: Number, 
		faculty: String,
		rolls: [{
			student: String,
			present: {type: Boolean, default: false}
		}]
	}]
}, {collection: 'batch'}));