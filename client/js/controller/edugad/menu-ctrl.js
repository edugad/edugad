edugad.controller('EdugadMenuCtrl', ['$scope', '$rootScope', '$state', '$sessionStorage', 'ApiFact', function($scope, $rootScope, $state, $sessionStorage, ApiFact) {

	$scope.logUser = {};

	// $scope.roles = ApiFact.UserRoles.query(function(){
 //        console.log(JSON.stringify($scope.roles));
 //    });

	$scope.show = function(){
		angular.element('.ui.login.modal').modal('show');
	};
	$scope.hide = function(){
		angular.element('.ui.login.modal').modal('hide');
	};

	$scope.login = function(){
		var loggedUser = new ApiFact.UserLogin();
        loggedUser.username = $scope.logUser.username;
        loggedUser.password = $scope.logUser.password;
        loggedUser.$save(function(data){
            $scope.hide();
            if(data.error){
            	$rootScope.$emit('message', {head:'Invalid Login!', body:'Please enter valid credentials.', type:'error'});
            }else{
            	$sessionStorage.context = data;
            	// console.log(JSON.stringify(data));//set context
            	$state.transitionTo('tutor.student');
            }
			
        },function(err){
            $scope.hide();
			$rootScope.$emit('message', {head:'Invalid Login!', body:'Please enter valid credentials.', type:'error'});
        });
	};
}]);