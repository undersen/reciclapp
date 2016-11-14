'use strict';

(function() {
  this.app.service('StorageUserService', ['$q', '$localStorage', function($q, $localStorage) {

    var currentUser;

    return {

      getCurrentUser: function() {
        return currentUser = $localStorage.currentUser;
      },
      setCurrentUser: function(data) {
        $localStorage.currentUser = data;
      },
      destroyCurrentUser: function() {
        delete $localStorage.currentUser;
        return true;
      }
    };

  }]);
}).call(this);
