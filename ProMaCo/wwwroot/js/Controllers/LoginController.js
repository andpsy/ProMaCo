﻿'use strict';
app.controller('LoginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {

            $location.path('/BankReceipt');

        },
            function (err) {
                $scope.message = err.error_description;
            });
    };

}]);