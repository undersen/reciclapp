"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("ProfileController", ["$scope", "$state","StorageUserService",
  function($scope, $state,StorageUserService) {

    $scope.init = function() {
      $scope.user =StorageUserService.getCurrentUser(); //⁉️ whataaaahell
      console.log($scope.user);
    };

    $scope.activateEditProfle = function(){

    }

    $scope.updateProfile=function(){

    }

    $scope.goToAddressList = function(){
      $state.go('user.addAddress');
    }







  }]);
}).call(this);
