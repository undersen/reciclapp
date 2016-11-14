'use strict';
/*
=========================================
PLATFORM CONFIGURATION
=========================================
*/

(function() {
	this.app.run(function($ionicPlatform) {

		var db =null;

		$ionicPlatform.ready(function() {

			// ionic.Platform.isFullScreen = true;

			if(window.cordova && window.cordova.plugins.Keyboard && window.cordova.plugins) {
				// cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				// cordova.plugins.Keyboard.disableScroll(false);
			};
			if(window.StatusBar) {
				StatusBar.styleDefault();
			};


		});

	});
}).call(this);
