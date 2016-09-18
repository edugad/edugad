var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: {type: String, required: true},
	password: {type: String, required: true},
	role: {type: String, enum: ['admin', 'tutor', 'pupil']},
	institute: {type: String, default: 'edugad.org'},
});

//console.log(User.schema.path('role').enumValues);