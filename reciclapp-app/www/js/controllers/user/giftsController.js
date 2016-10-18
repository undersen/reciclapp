"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("GiftsController", ["$scope", "$state",
  function($scope, $state) {

    $scope.init = function() {

    };

    $('.collapse').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('active');
    });

    $scope.goRecycle= function() {
      debugger;
    }

  }]);
}).call(this);
