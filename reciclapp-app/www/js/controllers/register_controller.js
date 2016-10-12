'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller('RegisterController', ['$scope','StorageFacebookService',
  function($scope,StorageFacebookService) {

    $scope.init = function() {
      $scope.user =StorageFacebookService.getCurrentFacebookUser();
    }

    $scope.next = function(){

    }


  }]);
}).call(this);
