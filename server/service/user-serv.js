var User = require('../model/user');

module.exports.create = function(req, res){
	var user = new User(req.body);
	user.save(function(err, data){
		res.json(data);
	});
};

module.exports.list = function(req, res){
	User.find({}, function(err, data){
		res.json(data);
	});
}