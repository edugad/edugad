edugad.controller('ReportCtrl', ['$scope', 'ApiFact', function($scope, ApiFact) {
	$scope.selectedBatch = {};
    $scope.batches = [];
    $scope.students = [];
    $scope.report = [];
    $scope.details = {head:[], body:[]};
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    ApiFact.Batch.query(function(data){
        $scope.batches = data;
    });
    ApiFact.Student.query(function(data){
        $scope.students = data;
    });

    $scope.changeBatch = function(){
        $scope.setReport();
        if($scope.report.length>0){
            $scope.chart();
        }
    };

    $scope.setReport = function(){
        $scope.report = [];
        for(var i=0; i<$scope.selectedBatch.students.length; i++){
            for(var j=0; j<$scope.students.length; j++){
                if($scope.selectedBatch.students[i] == $scope.students[j]._id){
                    var presence = 0;
                    var absence = 0;
                    //extra report
                    var stats = [];
                    for(var k=0; k<$scope.selectedBatch.attendances.length; k++){
                        for(var l=0; l<$scope.selectedBatch.attendances[k].rolls.length; l++){
                            if($scope.selectedBatch.attendances[k].rolls[l].student == $scope.students[j]._id){
                                if($scope.selectedBatch.attendances[k].rolls[l].present){
                                    presence++;
                                }else{
                                    absence++;
                                }
                                //extra report
                                var stat = {};
                                stat.stat = $scope.selectedBatch.attendances[k].rolls[l].present?'P':'A';
                                stat.date = new Date($scope.selectedBatch.attendances[k].year, $scope.selectedBatch.attendances[k].month, $scope.selectedBatch.attendances[k].date);
                                if($scope.selectedBatch.category==='periodically'){
                                    stat.period = $scope.selectedBatch.attendances[k].period;
                                }else if($scope.selectedBatch.category==='hourly'){
                                    stat.from = $scope.selectedBatch.attendances[k].hrFrom + '' + $scope.selectedBatch.attendances[k].minFrom;
                                    stat.to = $scope.selectedBatch.attendances[k].hrTo + '' + $scope.selectedBatch.attendances[k].minTo;
                                }
                                stats.push(stat);
                            }
                        }
                    }
                    var total = $scope.selectedBatch.attendances.length;
                    var percentage = total==0?0:(presence*100)/total;
                    var record = {percentage: percentage.toFixed(2), student:$scope.students[j], presence:presence, absence:absence, total:total, category:$scope.selectedBatch.category, stats:stats};
                    $scope.report.push(record);
                    break;
                }
            }
        }
        console.log(JSON.stringify($scope.report[0]));
    };

    $scope.getData = function(){
        var data = [];
        for(var i=0; i<$scope.report.length; i++){
            var set = [];
            set.push($scope.report[i].student.roll+'. '+$scope.report[i].student.name);
            set.push($scope.report[i].presence);
            data.push(set);
        }
        return data;
    };
	$scope.chart = function(){
        var data = $scope.getData();
		Highcharts.chart('report-chart', {
            title: {text: 'Attendance Report'},
            credits: {enabled: false},
            xAxis: {type: 'category', labels: {rotation: -45, style: {fontSize: '13px', fontFamily: 'Verdana, sans-serif'}}},
            yAxis: {min: 0, title: {text: 'Presence (%)'}},
            legend: {enabled: false},
            tooltip: {pointFormat: 'Presence: <b>{point.y:.1f}</b>'},
            series: [{name: 'Presence', data: data, dataLabels: {enabled: true, rotation: -90, align: 'right', format: '{point.y:.1f}', y: 10, style: {fontSize: '13px', fontFamily: 'Verdana, sans-serif'}}}]
        });
	};
}]);