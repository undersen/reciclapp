'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller('SplashController', ['$scope',"$cordovaFacebook","UserFacebookModel","StorageFacebookService","$state",'User','StorageUserService',
  function($scope,$cordovaFacebook,UserFacebookModel,StorageFacebookService,$state,User,StorageUserService) {

    $scope.user={}

    $scope.init = function()
    {
      debugger;
      if(StorageUserService.getCurrentUser()){
        $state.go('user.dashboard')
      }

    }



    $scope.register = function() {
      $state.go('register');
      debugger;
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


    $scope.login = function(user) {
      if (user.email == undefined || user.email == ''){
        Materialize.toast('Completa tu correo',3000);
          return;
      }else if (user.email == undefined || user.email == ''){
        Materialize.toast('Completa tu password',3000);
        return;
      }else {
        user.password = md5(user.password)
        User.Login(user).then(function(response){
          debugger;


          if (response.data.estado == '1') {
            if(response.data.usuario.persona_comercio == 1 || response.data.usuario.persona_comercio== '1')
            {
              console.log('its commerce');
            }else if (response.data.usuario.persona_comercio == 0 || response.data.usuario.persona_comercio== '0'){
              StorageUserService.setCurrentUser(response.data.usuario);
              $state.go('user.dashboard');
            }
          } else {Materialize.toast('Usuario sin registro',3000);}
        },function(error){console.log(error);})
      }
  }




  }]);
}).call(this);
