"use strict";

(function() {
	this.app.config(function($stateProvider, $urlRouterProvider, $httpProvider,$ionicConfigProvider) {
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state"s controller can be found in controllers.js

		//clean back button text
		$ionicConfigProvider.backButton.previousTitleText(false).text('&emsp;&emsp;');

		// $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
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
			url: "/user",
			cache: false,
			abstract: true,
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

		.state("user.history", {
			cache: false,
			url: "/history",
			views: {
				'menuContent': {
					templateUrl: "templates/user/history.html",
					controller: "HistoryController"
				}
			}
		})

		.state("user.recycle", {
			cache: false,
			url: "/recycle",
			views: {
				'menuContent': {
					templateUrl: "templates/user/recycle.html",
					controller: "RecycleController"
				}
			}
		})

		.state("user.profile", {
			cache: false,
			url: "/profile",
			views: {
				'menuContent': {
					templateUrl: "templates/user/profile.html",
					controller: "ProfileController"
				}
			}

		})

		.state("user.gifts", {
			cache: false,
			url: "/gifts",
			views: {
				'menuContent': {
					templateUrl: "templates/user/gifts.html",
					controller: "GiftsController"
				}
			}
		})

		.state("user.categoryGifts", {
			cache: false,
			url: "/gifts/:category",
			views: {
				'menuContent': {
					templateUrl: "templates/user/categoryGift.html",
					controller: "CategoryGiftController"
				}
			}
		})

		.state("user.giftDetail", {
			cache: false,
			url: "/gifts/:category/:giftId",
			views: {
				'menuContent': {
					templateUrl: "templates/user/giftDetail.html",
					controller: "GiftDetailController"
				}
			}
		})

		.state("user.competition", {
			cache: false,
			url: "/competition",
			views: {
				'menuContent': {
					templateUrl: "templates/user/competitions.html",
					controller: "CompetitionController"
				}
			}
		})

		.state("user.addAddress", {
			cache: false,
			url: "/addAddress",
			views: {
				'menuContent': {
					templateUrl: "templates/user/addAddress.html",
					controller: "addAddressController"
				}
			}
		})

		.state("user.addressList", {
			cache: false,
			url: "/addressList",
			views: {
				'menuContent': {
					templateUrl: "templates/user/addressList.html",
					controller: "addressListController"
				}
			}
		})

		.state("user.competitionDetail", {
			cache: false,
			url: "/competition/:competitionId/",
			views: {
				'menuContent': {
					templateUrl: "templates/user/competitionDetail.html",
					controller: "CompetitionDetailController"
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
