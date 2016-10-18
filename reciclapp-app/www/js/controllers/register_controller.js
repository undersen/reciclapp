'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller('RegisterController', ['$scope','StorageFacebookService','$ionicPopup',
  function($scope,StorageFacebookService, $ionicPopup) {

    $scope.user =StorageFacebookService.getCurrentFacebookUser();
    var user_type = "user";

    $scope.init = function() {

    }

    $scope.nextInfo = function(){
      debugger;

      $("#second-info").removeClass("slideOutRight");
      setTimeout(function(){
        $("#first-info").addClass("hide");
        $("#first-info").removeClass("slideInLeft");
        $("#second-info").removeClass("hide");
        $("#second-info").addClass("animated");
        $("#second-info").addClass("slideInRight");
        $("#second-info").removeClass("slideOutRight");

      }, 1000);
      $("#first-info").removeClass("fadeinup");
      $("#first-info").addClass("animated");
      $("#first-info").addClass("slideOutLeft");
    }

    $scope.nextInfoAddress = function(){

      // $scope.data = {};
      //
      // // An elaborate, custom popup
      // var myPopup = $ionicPopup.show({
      //   template: '<input type="password" ng-model="data.wifi">',
      //   title: 'Enter Wi-Fi Password',
      //   subTitle: 'Please use normal things',
      //   scope: $scope,
      //   buttons: [
      //     { text: 'Cancel' },
      //     {
      //       text: '<b>Save</b>',
      //       type: 'button-positive',
      //       onTap: function(e) {
      //         if (!$scope.data.wifi) {
      //           //don't allow the user to close unless he enters wifi password
      //           e.preventDefault();
      //         } else {
      //           return $scope.data.wifi;
      //         }
      //       }
      //     }
      //   ]
      // });

      if(user_type == "user") {

        $("#third-info-user").removeClass("slideOutRight");
        setTimeout(function(){
          $("#second-info").addClass("hide");
          $("#second-info").removeClass("slideInLeft");
          $("#third-info-user").removeClass("hide");
          $("#third-info-user").addClass("animated");
          $("#third-info-user").addClass("slideInRight");
          $("#third-info-user").removeClass("slideOutRight");

        }, 1000);
        $("#second-info").removeClass("fadeinup");
        $("#second-info").addClass("animated");
        $("#second-info").addClass("slideOutLeft");

      }else {

        $("#third-info-user").removeClass("slideOutRight");
        setTimeout(function(){
          $("#second-info").addClass("hide");
          $("#second-info").removeClass("slideInLeft");
          $("#third-info-commerce").removeClass("hide");
          $("#third-info-commerce").addClass("animated");
          $("#third-info-commerce").addClass("slideInRight");
          $("#third-info-commerce").removeClass("slideOutRight");

        }, 1000);
        $("#second-info").removeClass("fadeinup");
        $("#second-info").addClass("animated");
        $("#second-info").addClass("slideOutLeft");


      }


    }


    $scope.changeUserType = function(type) {user_type = type;}




  }]);
}).call(this);
