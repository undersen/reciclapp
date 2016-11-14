'use strict';

(function() {
	this.app.factory('Address', ['$http', '$q', 'ENV','$state',
	function($http, $q, ENV,$state){

		return {
			getRegions: function() {
				var defer = $q.defer();
				$http({
					url: ENV.LOCAL + 'regiones_habilitadas.php',
					method: 'GET'
				}).then(function(response) {
					defer.resolve(response);

				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
      },
      getCommunesByRegion: function(regionId) {
        var defer = $q.defer();
        $http({
          url: ENV.LOCAL + 'comunas_habilitadas.php',
          method: 'GET',
          params:{
            idRegion : regionId
          }
        }).then(function(response) {
          defer.resolve(response);

        }, function(error) {
          defer.reject(error);
        });
        return defer.promise;
      },
			getAddress: function(user) {
				var defer = $q.defer();
				$http({
					url: ENV.LOCALNEW + 'obtener_direcciones.php',
					method: 'GET',
					params:{
						idUsu : user.id_usuario
					}
				}).then(function(response) {
					defer.resolve(response);

				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
			}

		}
		}]);
	}).call(this);
