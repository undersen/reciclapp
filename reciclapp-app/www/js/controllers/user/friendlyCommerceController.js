"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("FriendlyCommerceController", ["$scope", "$state","$cordovaGeolocation",
  function($scope, $state,$cordovaGeolocation) {


    var mapOptions ={}

    $scope.init = function() {

      $scope.loadMap();

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {



        $scope.loadMap(position.coords.latitude,position.coords.longitude);

      }, function(err) {
        materialize.toast("Verifica tu conexion y GPS",4000);
      });

    };


    $scope.loadMap = function (lat,long) {
      if (lat != undefined || long != undefined){
       mapOptions = {
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


        var marker1 = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:lat+0.00093, lng: long-0.000064},
          icon: "../img/marker.png"
        });

        var marker2 = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:lat+0.0073, lng: long+0.0074},
          icon: "../img/marker.png"
        });


        var marker3 = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat:lat+0.00073, lng: long+0.0004},
          icon: "../img/marker.png"
        });


        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Negocio juanito</h1>'+
        '<div id="bodyContent"></div>'+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker1);
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker2);
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker3);
        });
      });


    }
    else{

       mapOptions = {
        center: {lat:-33.91721, lng: -69.22630},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP


      };
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


    }



  }

  }]);
}).call(this);
