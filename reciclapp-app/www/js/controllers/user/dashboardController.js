"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("UserDashboardController", ["$scope", "$state",
  function($scope, $state) {

    $scope.init = function() {

    };

    $('.collapse').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('active');
    });

    $scope.goRecycle = function() {
      debugger;
    }

    $scope.goGifts =  function() {
      $state.go("user.gifts");
    }

  }]);
}).call(this);
