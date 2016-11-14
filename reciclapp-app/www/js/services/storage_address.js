'use strict';

(function() {
  this.app.service('StorageAddressService', ['$q', '$localStorage', function($q, $localStorage) {

    var address;

    return {

      getAddress: function() {
        return address = $localStorage.address;
      },
      setAddress: function(data) {
        $localStorage.address = data;
      },
      destroyAddress: function() {
        delete $localStorage.address;
        return true;
      },
      getAddressById : function(id){
        for (var i = 0; i < $localStorage.address.length; i++) {
          console.log('localStorage :'+$localStorage.address[i].id_dir);
          console.log('param :'+id);
          if(parseInt($localStorage.address[i].id_dir) == parseInt(id)){
            return address = $localStorage.address[i];
          }
        }
      }
    };

  }]);
}).call(this);
