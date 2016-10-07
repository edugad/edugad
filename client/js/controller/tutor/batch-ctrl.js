edugad.controller('BatchCtrl', ['$scope', '$rootScope', 'ApiFact', function($scope, $rootScope, ApiFact) {
	$scope.batches = [];
	$scope.students = [];
	// $scope.selectedBatch = {category: 'daily'};

	$scope.reset = function(){
		$scope.selectedBatch = {active:true};
		$scope.batchedStudents = [];
		$scope.selectedStudent = {};
		$scope.updated = false;
	};
	$scope.reset();

	ApiFact.Batch.query(function(data){
		$scope.batches = data;
	});
	ApiFact.Student.query(function(data){
		$scope.students = data;
	});

	ApiFact.Periods.query(function(data){
        $scope.categories = data;
    });

	$scope.upsert = function(){
		console.log(JSON.stringify($scope.selectedBatch));
		var batch = new ApiFact.Batch();
		batch.code = $scope.selectedBatch.code;
		batch.label = $scope.selectedBatch.label;
		batch.year = $scope.selectedBatch.year;
		batch.active = $scope.selectedBatch.active;
		batch.contact = $scope.selectedBatch.contact;
		batch.category = $scope.selectedBatch.category;
		batch.students = [];
		for(var i=0; i<$scope.batchedStudents.length; i++){
			batch.students.push($scope.batchedStudents[i]._id);
		}
		if(!$scope.updated){
			batch.$save(function(data){
				$scope.batches.push(data);
				$scope.selectedBatch = {};
				$scope.hide();	
			}, function(err){
				$rootScope.$emit('message', {head:'Error on add!', body:'Please contact admin.', type:'error'});
				$scope.hide();
			});
		}else{
			batch.$update({id:batch._id}, function(data){
				$scope.batches.push(data);
				$scope.selectedBatch = {};
				$scope.hide();	
			}, function(err){
				$rootScope.$emit('message', {head:'Error on update!', body:'Please contact admin.', type:'error'});
				$scope.hide();
			});
		}
	};

	$scope.edit = function(batch){
		$scope.updated = true;
		$scope.selectedBatch = batch;
		$scope.batchedStudents = [];
		for(var i=0; i<batch.students.length; i++){
			for(var j=0; j<$scope.students.length; j++){
				if($scope.students[j]._id == batch.students[i]){
					$scope.batchedStudents.push($scope.students[j]);
					break;
				}
			}
		}
		$scope.show();
	};

	$scope.remove = function(stud){
		$rootScope.$emit('message', {head:'Error on delete!', body:'Please contact admin.', type:'error'});//remove
		ApiFact.Batch.$remove({id:stud.id}, function(err){
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
	
	$scope.upload = function(){
		$rootScope.$emit('message', {head:'Upload is disabled!', body:'Please contact admin.', type:'error'});
	};

	$scope.join = function(){
		$scope.batchedStudents.push($scope.selectedStudent);
		$scope.selectedStudent = {};
	};
	$scope.disjoin = function(id){
		for(var i=$scope.batchedStudents.length-1; i>=0; i--){
			if($scope.batchedStudents[i].id == id){
				$scope.batchedStudents.splice(i, 1);
				break;
			}
		}
	};

	$scope.show = function(editable){
		angular.element('.ui.batch.modal').modal('show');
	};
	$scope.hide = function(){
		angular.element('.ui.batch.modal').modal('hide');
		$scope.reset();
	};
}]);