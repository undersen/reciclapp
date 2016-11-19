"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("GiftsController", ["$scope", "$state",
  function($scope, $state) {

    $scope.init = function() {};


    $scope.goToGifts= function(category){

      $state.go('user.categoryGifts',{category: category})
    }



  }]);
}).call(this);
