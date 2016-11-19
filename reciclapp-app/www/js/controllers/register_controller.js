'use strict';

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller('RegisterController', ['$scope','StorageFacebookService','SelectorServices','$state','User','Address','StorageRegionsService','StorageUserService',
  function($scope, StorageFacebookService, SelectorServices, $state, User,Address,StorageRegionsService,StorageUserService) {

     $scope.address = {};
     var isFacebook = false;
     var isCommerce = false;

    $scope.init = function() {
      Address.getRegions().then(function(response){
        console.log(response);
          StorageRegionsService.addRegions(response.data.regiones)
      },function(error){console.log(error);})
      if(StorageFacebookService.getCurrentFacebookUser()) {
        isFacebook=true;
        $scope.user = StorageFacebookService.getCurrentFacebookUser();
        $scope.user.address ={};
        console.log('facebookAcoount');
        $('email-label').addClass('active');
        $('name-label').addClass('active');

      }else{
        console.log('normal account');


        // $scope.user=

      }
    }

    $scope.loadRegionData= function(){$scope.regions = StorageRegionsService.getRegions();}

    $scope.loadCommunes = function(regionId){
    Address.getCommunesByRegion(regionId).then(function(response){
       $scope.communes= response.data.comunas;
      debugger;
    },function(error){
      console.log(error);
    })}

    $scope.nextInfoCommerce = function(){
      debugger;

      $("#third-info-user").removeClass("slideOutRight");
      setTimeout(function(){
        $("#fourth-info-commerce").addClass("hide");
        $("#fourth-info-commerce").removeClass("slideInLeft");
        $("#third-info-user").removeClass("hide");
        $("#third-info-user").addClass("animated");
        $("#third-info-user").addClass("slideInRight");
        $("#third-info-user").removeClass("slideOutRight");

      }, 1000);
      $("#fourth-info-commerce").removeClass("fadeinup");
      $("#fourth-info-commerce").addClass("animated");
      $("#fourth-info-commerce").addClass("slideOutLeft");
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


    $scope.takeASelfie = function(){
      try{
      var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      return "data:image/jpeg;base64," + imageData;
    }, function(err) {

    });
  }catch(e){
    // 🔧 we use try-catch because in browser you cant use camera
  }
  }


  $scope.finishUser = function (user,address){
    debugger;
    user.isFacebook="0"
    user.isCommerce="0"
    if(isFacebook){user.isFacebook="1"}
    if(isCommerce){user.isCommerce="1"}
    if(user.commerce_dni === undefined){user.commerce_dni=""}
    if(user.commerce_user === undefined){user.commerce_user=""}
    if(user.facebook_id === undefined){user.facebook_id=""}
    user.password = md5(user.password);

    User.RegisterUser(user,address).then(function(response){
      debugger;

      if(response.data.estado==1){
        debugger;

        StorageUserService.setCurrentUser(response.data.usuario);
        $state.go('user.dashboard')

      }else{Materialize.toast('Problemas al registrar la cuenta',4000)}

    },function(error){console.log(error);})}

    $scope.nextInfoAddress = function(kind){

      $scope.loadRegionData();
      if(kind == "user") {

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

        Materialize.toast('Opcion no disponible',4000);
        return;
        $scope.data = {};
        $("#fourth-info-commerce").removeClass("slideOutRight");
        setTimeout(function(){
          $("#second-info").addClass("hide");
          $("#second-info").removeClass("slideInLeft");
          $("#fourth-info-commerce").removeClass("hide");
          $("#fourth-info-commerce").addClass("animated");
          $("#fourth-info-commerce").addClass("slideInRight");
          $("#fourth-info-commerce").removeClass("slideOutRight");
          $('.popup').addClass('z-depth-3');
        }, 1000);
        $("#second-info").removeClass("fadeinup");
        $("#second-info").addClass("animated");
        $("#second-info").addClass("slideOutLeft");
      }
    }

    $scope.commercePhoto = function(){var image = takeASelfie();}

    $scope.userPhoto = function(){$scope.user.image = takeASelfie();}


//     $scope.loadGPS = function () {
//       $ionicLoading.show({
//         template: '<ion-spinner style="stroke:white;" icon="ripple"></ion-spinner><p>Buscando...</p>'
//       });
//
//       var posOptions = {timeout: 10000, enableHighAccuracy: false};
//       $cordovaGeolocation
//       .getCurrentPosition(posOptions)
//       .then(function (position) {
//
//         $ionicLoading.hide();
//         $scope.geocodeLatLng({lat:position.coords.latitude,lng:position.coords.longitude});
//
//
//       }, function(err) {
//         $ionicLoading.hide();
//         Materialize.toast("Verifica tu conexion y GPS",4000);
//       });
//
//     }
//
//
//     $(document).ready(function() {
//       $("#loadGps").click(function(event) {
//         useGps=true;
//         $scope.loadGPS();
//
//       });
//       $("#cancelGps").click(function(event) {
//         $("#address-name").prop("disabled", false);
//         $('a#button-user-end').text('Buscar direccion');
//       });
//       $("#accept1").click(function(event) {
//         debugger;
//         $state.go("/");
//       });
//       $("#accept2").click(function(event) {
//         debugger;
//         $state.go("/");
//       });
//     });
//
//
//
    $scope.initMap = function() {
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -33.4727091, lng: -70.7699142}
      });
      $scope.geocoder = new google.maps.Geocoder;
      $scope.infowindow = new google.maps.InfoWindow;
    }


    $scope.changeRegion = function(regionId) {

    }
//
//     $scope.geocodeLatLng = function(latlng) {
//       isOkRegion=false;
//       isOkComunne=false;
//
//       $scope.geocoder.geocode({'location': latlng}, function(results, status) {
//         if (status === google.maps.GeocoderStatus.OK) {
//           debugger;
//           if (results[1]) {
//             $scope.map.setZoom(15);
//
//
//             var marker = new google.maps.Marker({
//               position: latlng,
//               map: $scope.map
//             });
//
//
//             $scope.proceesAddress(results[0].formatted_address);
//             $scope.map.setCenter(new google.maps.LatLng(latlng));
//
//             // $scope.user.address.fulladdress = results[0].formatted_address;
//
//           } else {
//             window.alert('No results found');
//           }
//         } else {
//           window.alert('Geocoder failed due to: ' + status);
//         }
//       });
//     };
//
//     $scope.geocodeAddress = function (address){
//       debugger;
//       console.log(address);
//       geocoder.geocode( { 'address': address}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//
//           debugger;
//
//           $scope.geocodeLatLng({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
//
//
//         } else {
//           alert("Geocode was not successful for the following reason: " + status);
//         }
//       });
//     }

//     $scope.proceesAddress = function(address) {
//       debugger;
//       var finalAddress ='';
//       var numberAddress ;
//       var info = address.split(',');
//       // $('#address-street').val;
//       $scope.checkRegion(info);
//       var addressInfo = info[0].split(' ');
//
//       for (var i = 0; i < addressInfo.length; i++) {
//         try{
//           if(parseInt(addressInfo[i])) {
//             numberAddress = addressInfo[i];
//           }else {
//             finalAddress = finalAddress+addressInfo[i]
//           }
//         }catch(e){
//           debugger;
//         }
//       }
//       $('#address-street').val(finalAddress);
//       $('#address-number').val(numberAddress);
//
//       // $scope.addressUser.street= finalAddress;
//       // $scope.addressUser.number= numberAddress;
//       $("#address-street-label").addClass("active");
//       $("#address-number-label").addClass("active");
//       //
//
//       debugger;
//
//       // $scope.addressUser.street= finalAddress
//
//     }
//
//     $scope.nextInfoCommerce = function()
//     {
//       debugger;
//
//       $scope.data = {};
//       $("#fourth-info-commerce").removeClass("slideOutRight");
//       setTimeout(function(){
//         $("#third-info-commerce").addClass("hide");
//         $("#third-info-commerce").removeClass("slideInLeft");
//         $("#fourth-info-commerce").removeClass("hide");
//         $("#fourth-info-commerce").addClass("animated");
//         $("#fourth-info-commerce").addClass("slideInRight");
//         $("#fourth-info-commerce").removeClass("slideOutRight");
//
//       }, 1000);
//       $("#third-info-commerce").removeClass("fadeinup");
//       $("#third-info-commerce").addClass("animated");
//       $("#third-info-commerce").addClass("slideOutLeft");
//
//     }
//
//     $scope.checkRegion = function(info){
//       var commune;
//       var region;
//       var regions = SelectorServices.regions();
//       for (var i = 0; i < info.length; i++) {
//         if (info[i].substring(0,5)==' Regi') {
//           commune=info[i-1];
//           for (var j = 0; j < regions.length; j++) {
//             if (regions[j].name.trim() == info[i].trim()){
//
//               isOkRegion=true;
//               region =info[i].trim();
//
//               console.log('si esta la region');
//               debugger;
//             }
//           }
//           if (!isOkRegion){
//             $('#modalRegion').openModal();
//             $('#modalRegion').removeClass('hide');
//             return;
//           }else{
//             if(isOkRegion){
//               var communes = SelectorServices.communes();
//               for (var i = 0; i < communes.length; i++) {
//                 if(communes[i].name.trim() == commune.trim()){
//                   isOkComunne=true
//                   idCommune = communes[i].id;
//                   console.log(commune.trim());
//                   console.log('si esta la comuna');
//                 }
//               }
//               if (isOkComunne){
//                 $('#address-region').val(region);
//                 $('#address-commune').val(commune);
//                 $("#address-commune-label").addClass("active");
//                 $("#address-region-label").addClass("active");
//               }
//             }
//           }
//         }
//       }
//     }
//
//
//     $scope.registerUser = function(user) {
//       debugger;
//       if (useGps) {
//
// if (user.address== undefined ) {
//   user.address = {};
// }
//
//         user.address.commune = $('#address-commune').val();
//         user.address.region = $('#address-region').val();
//         user.address.street = $('#address-street').val();
//         user.address.number = $('#address-number').val();
//         user.address.block = $('#address-block').val();
//         user.address.apartment = $('#address-apartment').val();
//
//         if (user.address.name == undefined || user.address.name == '') {
//           Materialize.toast('Ingrese el nombre de tu direccion');
//           return;
//         }
//
//         if (user.address.street == '' || user.address.street === undefined) {
//           Materialize.toast('Ingrese la direccion');
//           return;
//         }
//
//         if (user.address.number == '' || user.address.number === undefined) {
//
//         }else if (user.address.number.includes('-')) {
//           Materialize.toast('Ingrese la numeracion exacta',400);
//           return;
//         }
//
//
//
//         User.RegisterUser(user).then(function(response){
//
//           if(response.data.estado == 1){
//
//           }else{
//             Materialize.toast('Error al crear la cuenta',4000);
//             return
//           }
//
//
//         },function(failure){
//
//         });
//       }else{
//
//         debugger;
//
//         if (user.address != undefined){
//           if (user.address.name == undefined || user.address.name == ''){Materialize.toast('Ingrese el nombre de tu direccion');return;}
//           if (user.address.street == undefined || user.address.street == ''){Materialize.toast('Ingrese la calle de su direccion');return;}
//           if (user.address.number == undefined || user.address.number == ''){Materialize.toast('Ingrese la calle de su direccion');return;}
//           if (user.address.commune == undefined || user.address.commune == ''){$scope.geocodeAddress(user.address.street + ' ' + user.address.number);
//         }else {$scope.geocodeAddress(user.address.street + ' ' + user.address.number + ','+user.address.commune);}}
//
//
//       }
//     };
//




  }]);
}).call(this);
