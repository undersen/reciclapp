"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("HistoryController", ["$scope", "$state","Recycle","StorageUserService","StorageAddressService",
  function($scope, $state,Recycle,StorageUserService,StorageAddressService) {

    $scope.user = StorageUserService.getCurrentUser();

    $scope.init = function() {

      Recycle.getDeclarationHistory($scope.user).then(function(response){
        console.log(response.data);
        if(response.data.estado == 1){
          $scope.declarations = response.data.declaraciones;
          $scope.historyMap($scope.declarations)
          console.log('finish1');
          // here we should add a kind of loader because the lazy loader info

        }else{
          console.log('error al pbtener historial');
        }

      },function(error){console.log(error);})

    };


    //Atencion con este metodo !!
    //Recorro los hsitoriales de declaraciones
    //genero un geocoder en donde busco obtener la informacion a la inversa brindando la direccion
    //busco la direccion en base al id de la direccion
    //obtengo el latlong y lo plasmo en el mapa dinamico
    //despues lo centro en el latlong y el marker igual

    $scope.historyMap = function(declarations) {
      angular.forEach(declarations, function(declaration, key) {

        $scope.geocoder = new google.maps.Geocoder();


        var address = StorageAddressService.getAddressById(declaration.id_direccion);
        address = address.calle +' '+ address.numero + ', '+ address.comuna_nombre;
        console.log(address);

        $scope.geocoder.geocode( { 'address': address  }, function(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {

            var latLng = results[0].geometry.location
            var mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"+declaration.id_dec), mapOptions);
            console.log(declaration.id_dec);

            $scope.marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.Ip,
              position: latLng
            });

            google.maps.event.addDomListener(window, "resize", function() {
              $scope.center = $scope.map.getCenter();

              google.maps.event.trigger($scope.map, "resize");
              $scope.map.setCenter($scope.center);
            });
            return;

          } else {
            console.log('uppppppps we dont have addres info nigga');}
        });
      });
    }





  }]);
}).call(this);
