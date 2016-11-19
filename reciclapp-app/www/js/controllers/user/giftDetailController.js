"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("GiftDetailController", ["$scope", "$state","$ionicHistory",
  function($scope, $state, $ionicHistory) {

    $scope.init = function() {
      //here i should look for the gifts by giftsID

    };

    $scope.exchange = function(){
      debugger;
    }

    $scope.myGoBack = function(){
       $ionicHistory.goBack();
    }


  }]);
}).call(this);
