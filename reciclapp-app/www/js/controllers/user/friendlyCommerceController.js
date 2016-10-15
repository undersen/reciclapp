"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FriendlyCommerceController", ["$scope", "$state","$cordovaGeolocation",
  function($scope, $state,$cordovaGeolocation) {

    $scope.init = function() {

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {

        debugger;

        $scope.loadMap(position.coords.latitude,position.coords.longitude);

      }, function(err) {
        // error
      });

    };


    $scope.loadMap = function (lat,long) {

      var mapOptions = {
        center: {lat:lat, lng: long},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };


      var places =  [
        {
          position: new google.maps.LatLng(-33.91721, -69.22630),
        },
        {
          position: new google.maps.LatLng(-33.45721, -70.22630),
        }
      ]

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      google.maps.event.addListenerOnce($scope.map, 'idle', function(){

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:lat, lng: long}
        });


        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:lat, lng: long}
        });


        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:-33.129876, lng: -69.83123},
          icon: "../img/marker.png"
        });

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:-32.129876, lng: -69.93123},
          icon: "../img/marker.png"
        });


        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:-33.429876, lng: -70.23123},
          icon: "../img/marker.png"
        });






      });




    }

  }]);
}).call(this);
