'use strict';

(function() {
  this.app.service('StorageFacebookService', ['$q', '$localStorage', function($q, $localStorage) {

    var currentFacebookUser;

    return {

      getCurrentFacebookUser: function() {
        return currentFacebookUser = $localStorage.currentFacebookUser;
      },
      setCurrentFacebookUser: function(data) {
        $localStorage.currentFacebookUser = data;
      },
      destroyCurrentFacebookUser: function() {
        delete $localStorage.currentFacebookUser;
        return true;
      }
    };

  }]);
}).call(this);
