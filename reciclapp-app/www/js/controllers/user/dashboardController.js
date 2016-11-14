"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("UserDashboardController", ["$scope", "$state",'StorageUserService','StorageFacebookService','Address','StorageAddressService','$ionicModal',
  function($scope, $state,StorageUserService,StorageFacebookService,Address,StorageAddressService,$ionicModal) {



    $scope.init = function() {
      $scope.user =StorageUserService.getCurrentUser(); //⁉️ whataaaahell

      Address.getAddress($scope.user).then(function(response){
        if(response.data.estado==1){StorageAddressService.setAddress(response.data.direcciones);
        }else{console.log('error to get address');}},function(error){console.log(error);})};

    $('.collapse').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('active');
    });

    $scope.goToRecycle = function() {$state.go('user.recycle');}

    $scope.goToProfile = function() {$state.go('user.profile');}

    $scope.goGifts =  function() {
      $state.go("user.gifts");
    }

    $scope.logout = function(){
      if(StorageUserService.destroyCurrentUser()){console.log('currentUser destroyed');}
      if (StorageFacebookService.destroyCurrentFacebookUser()){console.log('facebookcurrentUser destroyed');}
      $state.go('/');
    }

    $scope.letsRecycle = function(){

    }



  }]);
}).call(this);
