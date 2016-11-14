'use strict';

(function() {
	this.app.factory('User', ['$http', '$q', 'ENV','$state',
	function($http, $q, ENV,$state){

		return {

			Login: function(user) {
				var defer = $q.defer();
				$http({
					url: ENV.LOCALNEW + 'inicio_sesion_persona.php',
					method: 'POST',
					data: {
						correo: user.email,
						contrasena: user.password
					}
				}).then(function(response) {
					defer.resolve(response);

				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
			},

      RegisterUser: function(user,address) {
        var defer = $q.defer();
				debugger;
        $http({
          url: ENV.LOCALNEW + 'insert_usuario.php',
          method: 'POST',
          data: {

   				  id_comuna: address.commune,
						calle: address.street,
					  numero: address.number,
					  id_facebook: user.facebook_id,
					  correo: user.email,
					  nombre: address.name,
					  num_depto: address.numberDepto,
					  block: address.block,
					  nombre_usuario: user.name,
					  persona_comercio: user.isCommerce,
					  facebook_correo: user.isFacebook,
					  telefono: user.phone,
					  sexo: "M",
					  fecha_nacimiento: "2011-11-11",
					  contrasena: user.password,
					  rut: user.commerce_dni,
					  encargado: user.commerce_user

					}
        }).then(function(response) {


          defer.resolve(response);
        }, function(error) {
          defer.reject(error);
        });
        return defer.promise;
			},

			RegisterCommerce: function(user) {
				var defer = $q.defer();
				$http({
					url: ENV.LOCALNEW + 'inicio_sesion_persona.php',
					method: 'POST',
					data: {
						correo: user.email,
						contrasena: user.password,



//   				// id_comuna: user.address.comuna,
						// calle    : user.address.street,
						// numero   : user.address.number,
						// block    : user.address.block,
						// num_depto: user.address.num_depto,
						// id_usu: 		user.email,
						// correo: 		user.email,
						// nombre: $saddress.name,
						// nombre_usuario: $scope.user.name,
						// persona_comercio: 0,
						// facebook_correo: 0,
						// telefono: ,
						// sexo : "M",
						// fecha_nacimiento: "2016-04-30",
						// contrasena: ""


					}
				}).then(function(response) {
					defer.resolve(currentUser);
				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
			},
			
			existUser: function(email) {
				var defer = $q.defer();
				$http({
					url: ENV.LOCAL + 'select_existe.php.php',
					method: 'GET',
					params:{
						idUsu : email
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
