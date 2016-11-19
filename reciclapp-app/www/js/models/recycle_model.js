'use strict';

(function() {
	this.app.factory('Recycle', ['$http', '$q', 'ENV','$state',
	function($http, $q, ENV,$state){

		return {
			insertDeclaration: function(declaration,id_usuario) {
				debugger;
				var defer = $q.defer();
				$http({
					url: ENV.LOCALNEW + 'insert_declaracion.php',
					method: 'POST',
          data: {
            id_direccion: declaration.addressId,
            id_usuario: id_usuario,
            id_periodo: declaration.schedule,
            observacion: declaration.observation,
            xCantLata: declaration.can,
            xCantCarton: declaration.paperboard,
            xCantPlastico: declaration.plastic,
            xCantVidrio: declaration.glass
          }
				}).then(function(response) {
					defer.resolve(response);

				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
      },
			getDeclarationHistory: function(user) {
				var defer = $q.defer();
				$http({
					url: ENV.LOCALNEW + 'obtener_declaraciones.php',
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
