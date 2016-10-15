"use strict";

(function() {
	this.app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state"s controller can be found in controllers.js

		$httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
		$httpProvider.defaults.headers.put["Content-Type"] = "application/json; charset=UTF-8";
		$httpProvider.defaults.headers.patch["Content-Type"] = "application/json; charset=UTF-8";

		/*
		============================
		GENERAL VIEWS
		============================
		*/

		$stateProvider
		.state("/", {
			cache: false,
			url: "/",
			templateUrl: "templates/splash.html",
			controller: "SplashController"
		})
		.state("register", {
			cache: false,
			url: "/register",
			templateUrl: "templates/register.html",
			controller: "RegisterController"
		})
		.state("user", {
			url: "/wefix/user/",
			cache: false,
			abstract: false,
			templateUrl: "templates/user/menu.html",
			controller: "UserDashboardController"
		})
		.state("user.dashboard", {
			cache: false,
			url: "/dashboard",
			views: {
				'menuContent': {
					templateUrl: "templates/user/dashboard.html",
					controller: "UserDashboardController"
				}
			}

		})

		.state("user.friendlyCommerce", {
			cache: false,
			url: "/friendly-commerce",
			views: {
				'menuContent': {
					templateUrl: "templates/user/friendlyCommerce.html",
					controller: "FriendlyCommerceController"
				}
			}

		})

		.state("user.events", {
			cache: false,
			url: "/events",
			views: {
				'menuContent': {
					templateUrl: "templates/user/events.html",
					controller: "EventsController"
				}
			}

		})
		.state("minimarket.dashboard", {
			cache: false,
			url: "/minimarket",
			views: {
				'menuContent': {
					templateUrl: "templates/minimarket/dashboard.html",
					controller: "MinimarketDashboardController"
				}
			}
		})


		$urlRouterProvider.otherwise("/");



	});
}).call(this);
