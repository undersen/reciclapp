"use strict";

(function(){
	this.app.config(function($cordovaFacebookProvider) {
     var appID = 546201138887175;

  var version = "v2.6"; // or leave blank and default is v2.0
  $cordovaFacebookProvider.browserInit(appID, version);

  });
}).call(this);
