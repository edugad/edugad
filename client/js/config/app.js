var edugad = angular.module('edugad',['ngResource', 'ui.router']);

//http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html

edugad.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
  	$stateProvider
	    .state('home', {
	      url: '/',
	      views: {
	      	'header': {
	      		templateUrl: '/edugad/header.html',
	      		controller: 'EdugadMenuCtrl'
	      	},
	      	'portal': {
	      		templateUrl: '/edugad/home.html'
	      	},
	      	'footer': {
	      		templateUrl: '/edugad/footer.html'
	      	}
	      }
	    })
	    .state('about', {
	      url: '/about',
	      views: {
	      	'header': {
	      		templateUrl: '/edugad/header.html',
	      		controller: 'EdugadMenuCtrl'
	      	},
	      	'portal': {
	      		templateUrl: '/edugad/about.html'
	      	},
	      	'footer': {
	      		templateUrl: '/edugad/footer.html'
	      	}
	      }
	    })
	    .state('student', {
	      url: '/student',
	      views: {
	      	'header': {
	      		templateUrl: '/tutor/header.html'
	      	},
	      	'footer': {
	      		templateUrl: '/tutor/footer.html'
	      	},
	      	'portal': {
	      		templateUrl: '/tutor/student.html',
	      		controller: 'StudentCtrl'
	      	}
	      }
	    })
	    .state('batch', {
	      url: '/batch',
	      views: {
	      	'header': {
	      		templateUrl: '/tutor/header.html'
	      	},
	      	'footer': {
	      		templateUrl: '/tutor/footer.html'
	      	},
	      	'portal': {
	      		templateUrl: '/tutor/batch.html',
	      		controller: 'BatchCtrl'
	      	}
	      }
	    })
	    .state('attendance', {
	      url: '/attendance',
	      views: {
	      	'header': {
	      		templateUrl: '/tutor/header.html'
	      	},
	      	'footer': {
	      		templateUrl: '/tutor/footer.html'
	      	},
	      	'portal': {
	      		templateUrl: '/tutor/attendance.html',
	      		controller: 'AttendanceCtrl'
	      	}
	      }
	    })
	    .state('report', {
	      url: '/report',
	      views: {
	      	'header': {
	      		templateUrl: '/tutor/header.html'
	      	},
	      	'footer': {
	      		templateUrl: '/tutor/footer.html'
	      	},
	      	'portal': {
	      		templateUrl: '/tutor/report.html',
	      		controller: 'ReportCtrl'
	      	}
	      }
	    })
});