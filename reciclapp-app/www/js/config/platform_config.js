'use strict';
/*
=========================================
PLATFORM CONFIGURATION
=========================================
*/

(function() {
	this.app.run(function($ionicPlatform) {



		$ionicPlatform.ready(function() {

			// ionic.Platform.isFullScreen = true;
			// $ionicConfigProvider.backButton.previousTitleText(false);


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
