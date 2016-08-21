var express 	= require('express'),
	app 		= express(),
	mongoose	= require('mongoose'),
	multer		= require('multer'),
	bodyParser 	= require('body-parser');

var port = 9000;

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

//add REST apis
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(methodOverride('X-HTTP-Method-Override'));
// app.use(multer({dest: './server/upload/'}));

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

//upload student
app.post('/upload/student', function(req, res){
	res.json({success: true});
});

//student apis
app.post('/api/student', studentServ.create);
app.put('/api/student/:id', studentServ.update);
app.delete('/api/student/:id', studentServ.remove);
app.get('/api/student/:id', studentServ.find);
app.get('/api/students', studentServ.list);

//batch apis
app.post('/api/batch', batchServ.create);
app.put('/api/batch/:id', batchServ.update);
app.delete('/api/batch/:id', batchServ.remove);
app.get('/api/batch/:id', batchServ.find);
app.get('/api/batches', batchServ.list);

//metainfo apis
app.post('/api/metainfo', metainfoServ.create);
app.put('/api/metainfo', metainfoServ.update);
app.get('/api/metainfo', metainfoServ.find);
app.delete('/api/metainfo', metainfoServ.remove);
app.get('/api/metainfos', metainfoServ.list);

//connect mongodb
mongoose.connect('mongodb://localhost:27017/edugad');