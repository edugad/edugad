edugad.controller('EdugadMenuCtrl', ['$scope', '$rootScope', '$resource', '$state', function($scope, $rootScope, $resource, $state) {

	var User = $resource('/api/user');

	$scope.logUser = {};

	$scope.show = function(){
		angular.element('.ui.login.modal').modal('show');
	};
	$scope.hide = function(){
		angular.element('.ui.login.modal').modal('hide');
	};

	$scope.login = function(){
		//var user = new User();
		if($scope.logUser.username!=null && $scope.logUser.username!='' && $scope.logUser.password!=null && $scope.logUser.password!=''){
			$state.transitionTo('student');
			$scope.hide();
		}else{
			$scope.hide();
			$rootScope.$emit('message', {head:'Invalid Login!', body:'Please enter valid credentials.', type:'error'});
		}
	};
}]);