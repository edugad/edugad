edugad.factory('AuthInterceptor', function($q, $location, $sessionStorage) {
	return {
		request: function(request){
			// request.headers = request.headers || {};
			// if($sessionStorage.context){
			// 	request.headers.Authorization = 'Bearer ' + $sessionStorage.context._id;
			// }

			return request;
		}, response: function(response){
			if(!$sessionStorage.context){
				$location.url('/home');
			}
			return response;
		}, responseError: function(response){
			if(response.status===401){
				$location.url('/home');
			}
			return $q.reject(response);
		}
	};
});