var mongoose = require('mongoose');

module.exports = mongoose.model('Batch', mongoose.Schema({
	code: String,
	label: {type: String, required: true},
	year: {type: Number, required: true},
	active: {type: Boolean, default: true},
	students: [String],
	category: {type: String, enum: ['daily', 'periodically', 'hourly']},
	attendances: [{ 
		faculty: {
			id: {type: String, required: true},
			name: {type: String, required: true}
		},
		rolls: [{
			student: String,
			present: {type: Boolean, default: false}
		}],
		year: {type: Number, required: true}, 
		month: {type: Number, required: true}, 
		date: {type: Number, required: true}, 
		period: {type: Number, default: 0},
		hrFrom: {type: Number, default: 0}, 
		minFrom: {type: Number, default: 0}, 
		hrTo: {type: Number, default: 0}, 
		minTo: {type: Number, default: 0}
	}]
}, {collection: 'batch'}));