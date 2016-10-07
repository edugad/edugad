edugad.controller('AttendanceCtrl', ['$scope', '$rootScope', '$sessionStorage', 'ApiFact', function($scope, $rootScope, $sessionStorage, ApiFact) {
	Date.prototype.addTime = function(time) {    
	   this.setTime(this.getTime() + time); 
	   return this;   
	}
	$scope.filter = {};
	$scope.batches = [];
	$scope.students = [];
	$scope.faculty = {id:$sessionStorage.context._id, name:$sessionStorage.context.username};

	$scope.reset = function(){
		$scope.studentStats = [];
		$scope.filter = {batch:{}, date:new Date(), from:new Date(), to:new Date().addTime(1*60*60*1000), period:1, selected:false, faculty:$scope.faculty};
	};
	$scope.reset();

	ApiFact.Batch.query(function(data){
		$scope.batches = data;
	});
	ApiFact.Student.query(function(data){
		$scope.students = data;
	});

	$scope.changeBatch = function(){
		$scope.studentStats = [];
		for(var i=0; i<$scope.filter.batch.students.length; i++){
			for(var j=0; j<$scope.students.length; j++){
				if($scope.filter.batch.students[i] == $scope.students[j]._id){
					$scope.studentStats.push({stat:false, stud:$scope.students[j]});
					break;
				}
			}
		}
	};
	$scope.changeAll = function(){
		for(var i=0; i<$scope.studentStats.length; i++){
			$scope.studentStats[i].stat = $scope.filter.selected;
		}
	};
	
	$scope.submit = function(){
		//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
		
		var attendance = {};
		attendance.year = $scope.filter.date.getFullYear();
		attendance.month = $scope.filter.date.getMonth();
		attendance.date = $scope.filter.date.getDate();
		if($scope.filter.batch.category==='hourly'){
			attendance.hrFrom = $scope.filter.from.getHours();
			attendance.minFrom = $scope.filter.from.getMinutes();
			attendance.hrTo = $scope.filter.to.getHours();
			attendance.minTo = $scope.filter.to.getMinutes();
		}else if($scope.filter.batch.category==='periodically'){
			attendance.period = $scope.filter.period;
		}
		attendance.faculty = $scope.filter.faculty;
		attendance.rolls = [];
		for(var i=0; i<$scope.studentStats.length; i++){
			attendance.rolls.push({student:$scope.studentStats[i].stud._id, present:$scope.studentStats[i].stat});
		}
		//check if present
		if(typeof $scope.filter.batch.attendances == 'undefined'){
			$scope.filter.batch.attendances = [];
		}else{
			for(var i=0; i<$scope.filter.batch.attendances.length; i++){
				var att = $scope.filter.batch.attendances[i];
				if(attendance.year==att.year && attendance.month==att.month && attendance.date==att.date
					 && attendance.hrFrom==att.hrFrom && attendance.minFrom==att.minFrom
					 && attendance.hrTo==att.hrTo && attendance.minTo==att.minTo
					 && $scope.filter.batch.category==='daily'){
					$rootScope.$emit('message', {head:'Attendance is not required!', body:'The attendance is already taken.', type:'error'});
					return;
				}
			}
		}
		$scope.filter.batch.attendances.push(attendance);
		ApiFact.Batch.update({id:$scope.filter.batch._id}, $scope.filter.batch);
		var time = new Date(attendance.year, attendance.month, attendance.date, attendance.hrFrom, attendance.minFrom, 0, 0);
		var msg = $scope.filter.batch.label+' at '+time.toString();
		$scope.reset();
		$rootScope.$emit('message', {head:'Attendance is taken!', body:msg, type:'info'});
	};
}]);