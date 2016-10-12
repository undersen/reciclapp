'use strict';

/**
* @name: Customer
* @description: contains a set of customer
* @attributes:
*
* | Name              | Type           |
* |-------------------|----------------|
* | @id               | int            |
* | @firstName        | string         |
* | @lastName         | string         |
*
*/

(function() {
	this.app.factory('UserFacebookModel', ['$http', '$q', 'ENV','$state',
	function($http, $q, ENV,$state){

		return {

			getFacebookAccount: function(success) {
				var defer = $q.defer();
				console.info(success.authResponse.userID);
				console.info(success.authResponse.accessToken);
				$http({
					url: ENV.FACEBOOK + success.authResponse.userID  + '?access_token='+success.authResponse.accessToken+'&fields=id,name,gender,email',
					method: 'GET',
					data: {}
				}).then(function(facebookObject) {
					var currentUser = {
						id: facebookObject.data.id,
						name: facebookObject.data.name,
						gender: facebookObject.data.gender,
						email: facebookObject.data.email
					};
					defer.resolve(currentUser);
				}, function(error) {
					defer.reject(error);

				});
				return defer.promise;
			}


			};
		}]);
	}).call(this);
