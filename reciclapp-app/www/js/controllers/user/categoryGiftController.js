"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("CategoryGiftController", ["$scope", "$state","$stateParams","$ionicHistory",
  function($scope, $state, stateParams, $ionicHistory) {



    $scope.init = function() {
      $scope.category = stateParams.category;

    };


    $scope.myGoBack = function(){
       $ionicHistory.goBack();
    }

    $scope.goToGift= function(giftId){
      $state.go('user.giftDetail',{category:stateParams.category,giftId:giftId})
    }












  }]);
}).call(this);
