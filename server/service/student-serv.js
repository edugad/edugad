var Student = require('../model/student');
// var fs = require('fs');
var xlsToJson = require("xlsjs");
var xlsxToJson = require("xlsx");

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

module.exports.upload = function(req, res){
	if(!req.file){
        res.json({success: false, msg: 'No file to parse'});
        return;
    }
    var xls = undefined;
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
        xls = xlsxToJson;
    } else {
        xls = xlsToJson;
    }
    if(!xls){
		res.json({success: false, msg: 'No parser for the file'});
    	return;
	}
	try{
		console.log('path:', req.file.path);
		var workbook = xls.readFile(req.file.path);
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = xls.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if(roa.length > 0){
				result[sheetName] = roa;
			}
		});
		console.log('result:', JSON.stringify(result));
		res.json({success: true});
	}catch(err){
		res.json({success: false, msg:'Error while parsing', err: err});
	}
};

//http://codetheory.in/parse-read-excel-files-xls-xlsx-javascript/
//http://code.ciphertrick.com/2016/06/05/read-excel-files-convert-json-node-js/