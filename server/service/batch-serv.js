var Batch = require('../model/batch');

module.exports.create = function(req, res){
	var batch = new Batch(req.body);
	batch.save(function(err, data){
		if (err) throw err;
		res.json(data);
	});
};

module.exports.list = function(req, res){
	Batch.find({}, function(err, data){
		if (err) throw err;
		res.json(data);
	});
};

module.exports.find = function(req, res){
	Batch.findOne(req.body, function(err, data){
		if (err) throw err;
		res.json(data);
	});
};

module.exports.remove = function(req, res){
	Batch.findOneAndRemove({id: req.body.id}, function(err){
		if (err) throw err;
	});
};

module.exports.update = function(req, res){
	Batch.findByIdAndUpdate(req.params.id, req.body, function(err, batch){
		if (err) return res.send(500, { error: err });
		res.json(batch);
	});
};