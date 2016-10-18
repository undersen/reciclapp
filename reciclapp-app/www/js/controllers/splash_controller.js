'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller('SplashController', ['$scope',"$cordovaFacebook","UserFacebookModel","StorageFacebookService","$state",
  function($scope,$cordovaFacebook,UserFacebookModel,StorageFacebookService,$state) {

    $scope.user={}

    $scope.init = function() {
      //ask if the account form facebook exist
      // if existe ask if status is connected
      //if isnt connected make login



    }


    $scope.loginWithFacebook = function() {
      $('#loading-screen').removeClass('hide');

      $cordovaFacebook.login(["public_profile", "email", "user_friends"]).then(function(success) {
        UserFacebookModel.getFacebookAccount(success).then(function(userInfo){
          userInfo.avatar = "https://graph.facebook.com/"+userInfo.id+"/picture?type=large";
          StorageFacebookService.setCurrentFacebookUser(userInfo);
          debugger;
          $state.go("register");
        },function(error) {
          console.log(error);
          Materialize.toast('Facebook a denegado tu acceso',10000);
        });
      }, function (error) {
        Materialize.toast('Facebook a denegado tu acceso',10000);
      });
    };


    $scope.login = function() {

      debugger;
      if ($scope.user.email == "user@reciclapp.cl" && $scope.user.password == "12345678"){

        $state.go("user.dashboard");

      }else if ($scope.user.email == "company@reciclapp.cl" && $scope.user.password == "12345678") {

        $state.go("minimarket.dashboard");

      }else {
        $state.go("user.dashboard");
      }
    }

    $scope.register= function() {
      debugger;
    }


  }]);
}).call(this);
