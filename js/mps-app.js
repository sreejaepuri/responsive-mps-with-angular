/**
 * Created by EpaV on 12/07/2016.
 */
(function(){
    var app = angular.module("mps-app", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/",{
            templateUrl: "html/mps-home.html"
        })
            .when("/index.html", {
                templateUrl: "html/mps-home.html"
            })
            .when("/about-us", {
                templateUrl: "about-us.html"
            })
            .when("/contact-us", {
                templateUrl: "contact-us.html"
            })
            .when("/events", {
                templateUrl: "events.html"
            })
            .otherwise({
                redirectTo: "/index.html"
            });
    });

    app.directive("navigationMenu", function () {
        return {
            restriction: 'E',
            templateUrl: 'html/navigation-menu.html',
            controller: function () {
                this.nav_tab = 1;

                this.isSet = function (checkTab) {
                    return (this.nav_tab === checkTab);
                };

                this.setTab = function (setTab) {
                    this.nav_tab = setTab;
                };

            },
            controllerAs: 'nav_tab'
        };
    });

    app.controller("aboutController", function(){
        this.tab = 1;

        this.isSet = function (checkTab) {
            return (this.tab === checkTab);
        };

        this.setTab = function (setTab) {
            console.log("Tab clicked");
            this.tab = setTab;
        };
    });

})();

