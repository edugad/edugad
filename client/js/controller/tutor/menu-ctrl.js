edugad.controller('TutorMenuCtrl', ['$scope', '$rootScope', '$state', '$sessionStorage', function($scope, $rootScope, $state, $sessionStorage) {
    $scope.menu = $state.current.name.substring($state.current.name.indexOf('.')+1);

    $scope.setMenu = function(menu){
        $scope.menu = menu;
        console.log($scope.menu);
    };
    
	$scope.logout = function(){
        delete $sessionStorage.context;
		$state.transitionTo('edugad.home');
        $rootScope.$emit('message', {head:'See you again!', body:'You have successfully logged out.', type:'info'});
	};
}]);