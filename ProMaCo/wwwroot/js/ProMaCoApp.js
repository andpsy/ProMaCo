var app = angular.module('ProMaCoApp', ['ngRoute','ngMaterial']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.htm"
        })
        .when("/CoOwners", {
            templateUrl: "/html/CoOwners.html"
        })
        .when("/red", {
            templateUrl: "/html/red.html"
        })
        .when("/blue", {
            templateUrl: "blue.html"
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function () {
    console.log('App ready!');
});

app.controller('MainController', function ($rootScope, $scope, $http, $mdSidenav) {
    var self = this;
    self.toggleSideBar = toggleSideBar;

    function toggleSideBar() {
        $mdSidenav('leftSideNav').toggle();
    };
});