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
			},
			insertAddress: function(address,userId) {
				var defer = $q.defer();
				$http({
					url: ENV.LOCALNEW + '	insert_direccion.php',
					method: 'POST',
					data:{
					id_usuario: userId,
  				comunan_nombre: address.communeName, //TODO why should i send the name of the commune ?
  				calle: address.street,
  				numero: address.number,
  				nombre: address.name,
  				num_depto: address.numberDepto,
  				block: address.block,
  				dir_defecto: "1",
   				latitud:"-33.4406518",
   				longitud:"-70.6514212,15"

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
