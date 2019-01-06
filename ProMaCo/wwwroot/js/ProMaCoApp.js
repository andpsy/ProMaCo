var app = angular.module('ProMaCoApp', ['ngRoute', 'ngMessages', 'LocalStorageModule', 'ngMaterial']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/html/Login.html"
        })
        .when("/Login", {
            templateUrl: "/html/Login.html"
        })
        .when("/BankReceipt", {
            templateUrl: "/html/BankReceipt.html"
        })
        .when("/red", {
            templateUrl: "/html/red.html"
        })
        .when("/blue", {
            templateUrl: "blue.html"
        })
        .otherwise({
            redirectTo: '/html/Login.html'
        });
});

app.run(function ($rootScope) {
    console.log('App ready!');

    $rootScope.language_packs = [
        { 'language': 'en', 'svg': 'img/svg_icons/flags/uk.svg', 'pack': language_pack_en },
        { 'language': 'ro', 'svg': 'img/svg_icons/flags/ro.svg', 'pack': language_pack_ro }
    ];
    $rootScope.changeLanguage = function (language) {
        for (var i = 0; i < $rootScope.language_packs.length; i++) {
            if ($rootScope.language_packs[i].language == language) {
                $rootScope.language_pack = $rootScope.language_packs[i];
                break
            }
        }
    };
    $rootScope.language_pack = $rootScope.language_packs[0];

    $rootScope.setLabel = function (o, formName) {
        for (var i = 0; i < $rootScope.language_pack.pack.length; i++) {
            if ($rootScope.language_pack.pack[i].form.toLowerCase() == formName.toLowerCase().replace("form", "")) {
                for (var j = 0; j < $rootScope.language_pack.pack[i].labels.length; j++) {
                    if ($rootScope.language_pack.pack[i].labels[j].objectId == o[0].id) {
                        var lblText = $rootScope.language_pack.pack[i].labels[j].objectLabel;
                        o.text(lblText);
                        //o.html(lblText);
                        
                        try {
                            var cbx = document.getElementById(o[0].htmlFor);
                            if (cbx.tagName == "MD-SELECT") {
                                cbx.children[0].children[0].innerText = lblText;
                            }                            
                        } catch (e) { console.log('no');}
                        
                        break;
                    }
                }
                break;
            }
        }
    };
});

app.directive('setLabel', function ($rootScope) {
    return {
        require: ['^form'],
        scope: {},
        link: function (scope, element, attrs, ctrls) {
            var formName = ctrls[0].$name;
            $rootScope.setLabel(element, formName);

            $rootScope.$watch('language_pack', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $rootScope.setLabel(element, formName);
                }
            });

        }
    };
});

app.controller('MainController', function ($rootScope, $scope, $http, $mdSidenav) {

    var self = this;
    self.toggleSideBar = toggleSideBar;

    function toggleSideBar() {
        $mdSidenav('leftSideNav').toggle();
    };
});