var express = require('express');
var	app 	= express();
var port 	= 9000;

app.listen(port, function(){
	console.log('I\'m sorry, splashing on', port);
});

app.get('/', function(req, res){
	res.sendfile(__dirname + '/client/view/splash.html');
});