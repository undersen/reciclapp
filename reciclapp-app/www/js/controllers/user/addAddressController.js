"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("addAddressController", ["$scope", "$state","$ionicHistory","$cordovaGeolocation","Address","StorageRegionsService",
  function($scope, $state,$ionicHistory,$cordovaGeolocation,Address,StorageRegionsService) {

    var mapIsOk = false;
    var isPrincipalAddress =false;
    $scope.address = {};

    $scope.init = function() {

      $scope.initMap();

      Address.getRegions().then(function(response){
        console.log(response);
          StorageRegionsService.addRegions(response.data.regiones)
          $scope.loadRegionData();
      },function(error){console.log(error);})
    };

    $scope.defaultAddress = function(){
      console.log('pass');
      if(isPrincipalAddress){
        isPrincipalAddress=false;
      }else{isPrincipalAddress=true;}

    }

$scope.myGoBack = function(){
     $ionicHistory.goBack();
}

$scope.getMyPosition= function(){

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log(position);
    }, function(err) {
      Materialize.toast('Ups, debes activat GPS',4000);
    });
}

$scope.initMap = function() {
  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.4727091, lng: -70.6699142},
    disableDefaultUI: true

  });
  $scope.geocoder = new google.maps.Geocoder;
  $scope.infowindow = new google.maps.InfoWindow;
}

  $scope.addAddress = function(){
    if(mapIsOk){
      $scope.addres.isDefaultAddress=0;
      if(isPrincipalAddress){$scope.address.isDefaultAddress=1}

       Address.insertAddress($scope.address).then(function(response){
         if(response.data.estado ==1){
           $state.go('user.dashboard');
           Materialize.toast('Direccion agregada',4000)
         }else{
           Materialize.toast('Problemas al crear la direccion',4000)
         }
       },function(error){console.log(error);})
    }else{
      $scope.loadAddress($scope.address);
    }
  }

  //if the user search the address but change some value we will ask for
  $scope.unvalidateAddress = function(){mapIsOk = false;}

  // maybe i can use like a listener to watch the value of the var
  $scope.$watch('mapIsOk', function() {
        alert('you change the value from your address ');
    });

  $scope.loadAddress = function(address) {
      $scope.geocoder = new google.maps.Geocoder();

      debugger;
      var address = address.calle +' '+ address.numero + ', '+ address.comuna_nombre;
      console.log(address);

      $scope.geocoder.geocode( { 'address': address  }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          debugger;

          // $scope.address.latitude= results[0].geometry.location;
          // $scope.address.latitude= results[0].geometry.location;

          var latLng = results[0].geometry.location
          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


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
        } else {console.log('uppppppps we dont have addres info nigga');}
      });

  }


  // re-use code from register to load new communes and new region from server
  $scope.loadRegionData= function(){$scope.regions = StorageRegionsService.getRegions();}
  $scope.loadCommunes = function(regionId){Address.getCommunesByRegion(regionId).then(function(response){$scope.communes= response.data.comunas;},function(error){console.log(error);})}


  }]);
}).call(this);
