'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller('SplashController', ['$scope',"$cordovaFacebook","UserFacebookModel","StorageFacebookService","$state",
  function($scope,$cordovaFacebook,UserFacebookModel,StorageFacebookService,$state) {

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
      $state.go("register");


    },function(error) {
      console.log(error);
      // $('#loading-screen').addClass('hide');
      Materialize.toast('Facebook a denegado tu acceso',10000);


    });
  }, function (error) {

    // $('#loading-screen').addClass('hide');
    Materialize.toast('Facebook a denegado tu acceso',10000);
  });
};


  }]);
}).call(this);
