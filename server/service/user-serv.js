var User = require('../model/user');

module.exports.create = function(req, res){
	var user = new User(req.body);
	user.save(function(err, data){
		if (err) return res.send(500, { error: err });
		res.json(data);
	});
};

module.exports.update = function(req, res){
	User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
		if (err) return res.send(500, { error: err });
		res.json(user);
	});
};

module.exports.remove = function(req, res){
	User.findByIdAndRemove(req.params.id, function(err){
		if (err) return res.send(500, { error: err });
		return res.send("Succesfully deleted!");
	});
};

module.exports.find = function(req, res){
	User.findById(req.params.id, function(err, user){
		if (err) return res.send(500, { error: err });
		res.json(user);
	});
};

module.exports.list = function(req, res){
	User.find({}, function(err, data){
		res.json(data);
	});
};

module.exports.roles = function(req, res){
	res.json(User.schema.path('role').enumValues);
};

module.exports.login = function(req, res){
	var cred = req.body;
	User.find({username:cred.username, password:cred.password}, function(err, data){
		if(err){
			res.json({error:true});
			return;
		}
		var user = data[0];
		if( typeof user === 'undefined' || user === null ){
			res.json({error:true});
		}else{
			user.password = '';
			user.__v = '';
			delete user['password'];
			delete user['__v'];
			res.json(user);
		}
	});
};
