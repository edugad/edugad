var Student = require('../model/student');

module.exports.create = function(req, res){
	var student = new Student(req.body);
	student.save(function(err, data){
		if (err) return res.send(500, { error: err });
		res.json(data);
	});
};

module.exports.update = function(req, res){
	Student.findByIdAndUpdate(req.params.id, req.body, function(err, student){
		if (err) return res.send(500, { error: err });
		res.json(student);
	});
};

module.exports.remove = function(req, res){
	Student.findByIdAndRemove(req.params.id, function(err){
		if (err) return res.send(500, { error: err });
		return res.send("Succesfully deleted!");
	});
};

module.exports.find = function(req, res){
	Student.findById(req.params.id, function(err, student){
		if (err) return res.send(500, { error: err });
		res.json(student);
	});
};

module.exports.list = function(req, res){
	Student.find({}, function(err, data){
		res.json(data);
	});
};
