edugad.controller('ReportCtrl', ['$scope', '$resource', function($scope, $resource) {
	$scope.selectedBatch = {};
    $scope.batches = [];
    $scope.students = [];
    $scope.report = [];

	var Batches = $resource('/api/batches');
    var Students = $resource('/api/students');

    Batches.query(function(data){
        $scope.batches = data;
    });
    Students.query(function(data){
        $scope.students = data;
    });

    $scope.changeBatch = function(){
        $scope.report = [];
        for(var i=0; i<$scope.selectedBatch.students.length; i++){
            for(var j=0; j<$scope.students.length; j++){
                if($scope.selectedBatch.students[i] == $scope.students[j]._id){
                    var presence = 0;
                    var absence = 0;
                    for(var k=0; k<$scope.selectedBatch.attendances.length; k++){
                        for(var l=0; l<$scope.selectedBatch.attendances[k].rolls.length; l++){
                            if($scope.selectedBatch.attendances[k].rolls[l].student == $scope.students[j]._id){
                                if($scope.selectedBatch.attendances[k].rolls[l].present){
                                    presence++;
                                }else{
                                    absence++;
                                }
                            }
                        }
                    }
                    var total = $scope.selectedBatch.attendances.length;
                    var percentage = total==0?0:(presence*100)/total;
                    var record = {percentage: percentage.toFixed(2), student:$scope.students[j], presence:presence, absence:absence, total:total};
                    $scope.report.push(record);
                    break;
                }
            }
        }
        if($scope.report.length>0){
            $scope.chart();
        }
    };

    $scope.getData = function(){
        var data = [];
        for(var i=0; i<$scope.report.length; i++){
            var set = [];
            set.push($scope.report[i].student.roll+'. '+$scope.report[i].student.name);
            set.push($scope.report[i].student.presence);
            data.push(set);
        }
        return data;
    };
	$scope.chart = function(){
		Highcharts.chart('report-chart', {
            title: {text: 'Attendance Report'},
            credits: {enabled: false},
            xAxis: {type: 'category', labels: {rotation: -45, style: {fontSize: '13px', fontFamily: 'Verdana, sans-serif'}}},
            yAxis: {min: 0, title: {text: 'Presence (%)'}},
            legend: {enabled: false},
            tooltip: {pointFormat: 'Presence: <b>{point.y:.1f}</b>'},
            series: [{name: 'Presence', data: $scope.getData(), dataLabels: {enabled: true, rotation: -90, align: 'right', format: '{point.y:.1f}', y: 10, style: {fontSize: '13px', fontFamily: 'Verdana, sans-serif'}}}]
        });
	};
}]);