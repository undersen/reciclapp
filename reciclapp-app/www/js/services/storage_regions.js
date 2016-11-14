'use strict';

(function() {
  this.app.service('StorageRegionsService', ['$q', '$localStorage', function($q, $localStorage) {

    var regions;

    return {

      getRegions: function() {
        return regions = $localStorage.regions;
      },
      addRegions: function(data) {
        $localStorage.regions = data;
      },
      destroyRegions: function() {

        // 🔥 muajajaja destroy all regions from chile 😈
        delete $localStorage.regions;
        return true;
      }
    };

  }]);
}).call(this);
