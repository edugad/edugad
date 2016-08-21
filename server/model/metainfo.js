var mongoose = require('mongoose');

module.exports = mongoose.model('Metainfo', mongoose.Schema({
	name: String,
	values: [mongoose.Schema.Types.Mixed]
}, {collection: 'metainfo'}));