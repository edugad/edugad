edugad.factory('ApiFact', function($resource) {
	return {
		User: $resource('/api/users/:id', { id: '@_id' }, {update: {method: 'PUT'}}),
		UserLogin: $resource('/api/login'),
		UserRoles: $resource('/api/roles'),

		Student: $resource('/api/students/:id', { id: '@_id' }, {update: {method: 'PUT'}}),

		Batch: $resource('/api/batches/:id', { id: '@_id' }, {update: {method: 'PUT'}}),

		Metainfo: $resource('/api/metainfos/:id', { id: '@_id' }, {update: {method: 'PUT'}})
	};
});