 var edugad = angular.module('edugad',[
 	'ngResource',
 	'ui.router',
 	'ngStorage'
 ]);

//http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html

edugad.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
	// $locationProvider.html5Mode(false).hashPrefix('!');

	//interceptors
	$httpProvider.interceptors.push('AuthInterceptor');

	//routes
	$urlRouterProvider.otherwise('/home');
  	$stateProvider
	    .state('edugad', {
	      url: '/',
	      data: {roles: ['*']},
	      abstract: true,
	      views: {
	      	'header': {
	      		templateUrl: '/edugad/header.html',
	      		controller: 'EdugadMenuCtrl'
	      	},
	      	'footer': {
	      		templateUrl: '/edugad/footer.html'
	      	}
	      }
	    })
	    .state('edugad.home', {
	      url: 'home',
	      views: {
	      	'portal@': {
	      		templateUrl: '/edugad/home.html'
	      	}
	      }
	    })
	    .state('edugad.about', {
	      url: 'about',
	      views: {
	      	'portal@': {
	      		templateUrl: '/edugad/about.html'
	      	}
	      }
	    })
	    .state('tutor', {
	      url: '/tutor',
	      data: {roles: ['tutor', 'admin']},
	      abstract: true,
	      views: {
	      	'header': {
	      		templateUrl: '/tutor/header.html',
	      		controller: 'TutorMenuCtrl'
	      	},
	      	'footer': {
	      		templateUrl: '/tutor/footer.html'
	      	}
	      }
	    })
	    .state('tutor.student', {
	      url: '/student',
	      views: {
	      	'portal@': {
	      		templateUrl: '/tutor/student.html',
	      		controller: 'StudentCtrl'
	      	}
	      }
	    })
	    .state('tutor.batch', {
	      url: '/batch',
	      views: {
	      	'portal@': {
	      		templateUrl: '/tutor/batch.html',
	      		controller: 'BatchCtrl'
	      	}
	      }
	    })
	    .state('tutor.attendance', {
	      url: '/attendance',
	      views: {
	      	'portal@': {
	      		templateUrl: '/tutor/attendance.html',
	      		controller: 'AttendanceCtrl'
	      	}
	      }
	    })
	    .state('tutor.report', {
	      url: '/report',
	      views: {
	      	'portal@': {
	      		templateUrl: '/tutor/report.html',
	      		controller: 'ReportCtrl'
	      	}
	      }
	    })
});