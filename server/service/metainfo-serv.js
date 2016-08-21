var Metainfo = require('../model/metainfo');

module.exports.create = function(req, res){
	var metainfo = new Metainfo(req.body);
	metainfo.save(function(err, data){
		if (err) throw err;
		res.json(data);
	});
};

module.exports.list = function(req, res){
	Metainfo.find({}, function(err, data){
		if (err) throw err;
		res.json(data);
	});
};

module.exports.find = function(req, res){
	Metainfo.findOne(req.body, function(err, data){
		if (err) throw err;
		res.json(data);
	});
};

module.exports.remove = function(req, res){
	Metainfo.findOneAndRemove({id: req.body.id}, function(err){
		if (err) throw err;
	});
};

module.exports.update = function(req, res){
	Metainfo.findOneAndUpdate({name: req.body.name}, req.body, {upsert:true}, function(err){
		if (err) return res.send(500, { error: err });
		return res.send("Succesfully updated!");
	});
};