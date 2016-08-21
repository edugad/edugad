edugad.controller('StudentCtrl', ['$scope', '$rootScope', '$resource', 'fileUpload', function($scope, $rootScope, $resource, fileUpload) {
	$scope.students = [];
	$scope.newstudent = {};

	var Student = $resource('/api/student');
	var StudentId = $resource('/api/student/:id', {id:'@id'});
	var Students = $resource('/api/students');

	Students.query(function(data){
		$scope.students = data;
	});

	$scope.upload = function(){
		var file = $scope.studentFile;
        var uploadUrl = "/upload/student";
        fileUpload.upload(file, uploadUrl);
        $scope.hide();
        $rootScope.$emit('message', {head:'Upload is disabled!', body:'Please contact admin.', type:'error'});
	};

	$scope.show = function(editable){
		angular.element('.ui.upload.small.modal').modal('show');
	};
	$scope.hide = function(){
		$scope.studentFile = undefined;
		angular.element('.ui.upload.small.modal').modal('hide');
	};

	$scope.add = function(){
		var student = new Student();
		student.roll = $scope.newstudent.roll;
		student.name = $scope.newstudent.name;
		student.year = $scope.newstudent.year;
		student.email = $scope.newstudent.email;
		student.contact = $scope.newstudent.contact;
		student.$save(function(data){
			$scope.students.push(data);
			$scope.newstudent = {};	
		},function(err){
			$rootScope.$emit('message', {head:'Error on create!', body:'Please check your input.', type:'error'});
		});
	};

	$scope.remove = function(stud){
		$rootScope.$emit('message', {head:'Error on delete!', body:'Please contact admin.', type:'error'});//remove
		StudentId.$remove({id:stud.id}, function(err){
			if(err){
				$rootScope.$emit('message', {head:'Error on delete!', body:'Please contact admin.', type:'error'});
				return;
			}
			Students.query(function(data){
				$scope.students = data;
				$rootScope.$emit('message', {head:'Success!', body:'The student '+stud.name+' details are deleted.'});
			});
		});
	};

	$scope.edit = function(stud){
		$rootScope.$emit('message', {head:'Edit is disabled!', body:'Please contact admin.', type:'error'});
	};
}]);