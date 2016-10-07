var express 	= require('express');
var app 		= express();
var mongoose	= require('mongoose');
var multer		= require('multer');
var bodyParser 	= require('body-parser');
var cookieParser = require('cookie-parser');
//var path 		= require('path');
var session 	= require('express-session');
var passport 	= require('passport');
var strategy 	= require('passport-local').Strategy;
var mongpass	= require('passport-local-mongoose');
var bcrypt 		= require('bcrypt-nodejs');

var port = 8080;

var studentServ 	= require('./server/service/student-serv'),
	batchServ 		= require('./server/service/batch-serv'),
	userServ 		= require('./server/service/user-serv'),
	metainfoServ 	= require('./server/service/metainfo-serv');

//start-up
app.listen(port, function(){
	console.log('I\'m at your service & listening on', port);
});

//add shortcuts
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/lib', express.static(__dirname + '/client/lib'));
app.use('/edugad', express.static(__dirname + '/client/view/edugad'));
app.use('/tutor', express.static(__dirname + '/client/view/tutor'));
app.use('/config', express.static(__dirname + '/client/js/config'));
app.use('/ctrl', express.static(__dirname + '/client/js/controller'));
app.use('/dir', express.static(__dirname + '/client/js/directive'));
app.use('/serv', express.static(__dirname + '/client/js/service'));
app.use('/fact', express.static(__dirname + '/client/js/factory'));

//add REST apis
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
// app.use(bodyParser({keepExtensions:true}));
// app.use(methodOverride('X-HTTP-Method-Override'));

// app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'puthenveettil',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//add CORS support
// app.use(function(req, resp, next){
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// });

//serve home page
app.get('/', function(req, res){
	res.sendfile(__dirname + '/client/view/index.html');
});

var upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './server/upload/')
		}, filename: function (req, file, cb) {
			cb(null, file.originalname);        
		}
	}),
	fileFilter : function(req, file, cb) {
		if (['csv', 'xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return cb(new Error('Wrong extension type'));
        }
        cb(null, true);
	}
});

//student apis
app.get('/api/students', studentServ.list);
app.post('/api/students', studentServ.create);
app.get('/api/students/:id', studentServ.find);
app.put('/api/students/:id', studentServ.update);
// app.delete('/api/students/:id', studentServ.remove);
//upload student
app.post('/upload/students', upload.single('file'), studentServ.upload);

//user apis
app.get('/api/users', userServ.list);
app.get('/api/users/:id', userServ.find);
app.post('/api/users', userServ.create);
// app.put('/api/users/:id', userServ.update);
// app.delete('/api/users/:id', userServ.remove);
app.get('/api/roles', userServ.roles);
app.post('/api/login', userServ.login);

//batch apis
app.post('/api/batches', batchServ.create);
app.put('/api/batches/:id', batchServ.update);
app.delete('/api/batches/:id', batchServ.remove);
app.get('/api/batches/:id', batchServ.find);
app.get('/api/batches', batchServ.list);
app.get('/api/periods', batchServ.periods);

//metainfo apis
app.post('/api/metainfos', metainfoServ.create);
app.put('/api/metainfos/:id', metainfoServ.update);
app.get('/api/metainfos/:id', metainfoServ.find);
app.delete('/api/metainfos/:id', metainfoServ.remove);
app.get('/api/metainfos', metainfoServ.list);

//connect mongodb
mongoose.connect('mongodb://localhost:27017/edugad');

//passport
passport.serializeUser(function (user, done){
	return done(null, user._id);
});

passport.deserializeUser(function (id, done){
	userServ.find(id, function(err, user){
		done(err, user);
	});
});

passport.use('registerUser', new strategy(
	{passReqToCallback: true},
	function(req, username, password, done){
		var newUser = {
			username: username,
			password: password,
			role: req.body.role,
			institute: req.body.institute
		};
		userServ.create(newUser, function(err){
			if(err){
				return done(err);
			}
			return done(null, newUser);
		});
	}
	));
