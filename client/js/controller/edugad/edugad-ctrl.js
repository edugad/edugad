edugad.controller('EdugadCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$scope.message = {};

	$scope.demessage = function(){
		$scope.message = {enabled:false, type:'info', icon:'announcement', head:'Hi there!', body:'Welcome to edugad.com'};
	};

	$scope.demessage();

	$scope.enmessage = function(msg){
		$scope.message.head = msg.head;
		$scope.message.body = msg.body;
		$scope.message.type = msg.type || 'info';
		$scope.message.icon = msg.icon || 'announcement';
		$scope.message.enabled = true;
	};

	$rootScope.$on('message', function(event, data){
		$scope.enmessage(data);
	});
}]);