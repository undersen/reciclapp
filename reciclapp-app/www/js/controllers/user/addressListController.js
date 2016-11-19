"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("addressListController", ["$scope", "$state",
  function($scope, $state) {

    $scope.user = StorageUserService.getCurrentUser();

    $scope.init = function (){
      console.log(user);
      Address.getAddress().then(function(response){

      },function(error){

      })
    }

    $scope.goToAddAddress = function(){
      $state.go('user.addAddress');
    }


  }]);
}).call(this);
