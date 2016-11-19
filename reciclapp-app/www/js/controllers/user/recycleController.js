"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/

(function() {
  this.app.controller("RecycleController", ["$scope", "$state","StorageAddressService","Recycle","StorageUserService",
  function($scope, $state,StorageAddressService,Recycle,StorageUserService) {

    $scope.declaration={};
    var validationIsOk = false;


    $scope.init = function() {
      $scope.addresses = StorageAddressService.getAddress();

      $scope.user = StorageUserService.getCurrentUser();

      // $scope.loadAddress($scope.addresses[0]);
      $scope.initMap();
    };

    $('.collapse').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('active');
    });

    $scope.loadAddress = function(){
      debugger;
    }

    $scope.initMap = function (){
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.4724727, lng: -70.9100196},
        zoom: 8,
        disableDefaultUI: true
      });
    }

    $scope.declareRecycle = function(){


      console.log($scope.declaration);
        // var a = $scope.validateInfo();
        // if(a){
          Recycle.insertDeclaration($scope.declaration,$scope.user.id_usuario).then(function(response){

            debugger;
            if(response.data.estado==1){
              $state.go('user.dashboard')
              Materialize.toast('Declaracion Realizada',4000)
            }else{
              Materialize.toast('Problemas al declarar')
            }


          },function(error){

          })
        // }
    }

    $scope.loadMap = function(address){
      if(!angular.equals({}, address))
      {

        $scope.declaration.addressId = address.addressId;
        var response = StorageAddressService.getAddressById(address.addressId);
        var address = response.calle +" "+ response.numero + ", " + response.comuna_nombre;
        $scope.geocoder = new google.maps.Geocoder();

        $scope.geocoder.geocode( { 'address': address  }, function(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {

            var latLng = results[0].geometry.location
            var mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };


            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
              });
            });

            return;

          } else {
          console.log('uppppppps we dont have addres info nigga');
          }
        });
      }
    }

    $scope.validateInfo = function(){

      if($scope.declaration == undefined)
      {
        if($scope.declaration.cans== undefined || $scope.declaration.cans < 0){
          Materialize.toast('Latas debe ser mayor que 1',4000)
          return;
        }
        if($cope.declaration.paperboard == undefined || $scope.declaration.paperboard < 0){
          Materialize.toast('Carton debe ser mayor que 1',4000)
          return;
        }
        if($scope.declaration.plastic == undefined || $scope.declaration.plastic== 0){
          Materialize.toast('Plastico debe ser mayor que 1',4000)
          return;
        }
        if($scope.declaration.glass == undefined || $scope.declaration.glass== 0){
          Materialize.toast('Vidrio debe ser mayor que 1',4000)
          return;
        }

        if($scope.declaration.addressId == undefined || $scope.declaration.addressId == 0){
          Materialize.toast('Seleccione direccion',4000)
          return;
        }

        if($scope.declaration.schedule == undefined || $scope.declaration.schedule == ''){
          Materialize.toast('Seleccione horario de retiro',4000)
          return;
        }
        return true;
      }else{
        console.log("declaration is undefined");
      }
      return true;
    }



  }]);
}).call(this);
