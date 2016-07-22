/**
 * Created by EpaV on 12/07/2016.
 */
(function(){
    'use strict';

    var app = angular.module("mps-app", ['ngMaterial', 'ngMessages', 'ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider.when("/",{
            templateUrl: "html/mps-home.html"
        })
            .when("/index.html", {
                templateUrl: "html/mps-home.html"
            })
            .when("/about-us", {
                templateUrl: "html/about-us.html"
            })
            .when("/contact-us", {
                templateUrl: "html/contact-us.html"
            })
            .when("/events", {
                templateUrl: "html/events.html"
            })
            .when("/event", {
                templateUrl: "html/event.html"
            })
            .otherwise({
                redirectTo: "/index.html"
            });
    });

    app.config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .accentPalette('orange')
            .dark();

        $mdThemingProvider.theme('altTheme')
            .primaryPalette('purple');

    });

    app.directive("navigationMenu", function () {
        return {
            restriction: 'E',
            templateUrl: 'html/navigation-menu.html',
            controller: function ($scope) {
                this.nav_tab = 1;

                this.isSet = function (checkTab) {
                    return (this.nav_tab === checkTab);
                };

                this.setTab = function (setTab) {
                    this.nav_tab = setTab;
                };

                // $scope.event = {title:'Title 01', organizer:'Sampath Arjuna', times:['morning','day','evening', 'night'], description:'', code:''};
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

    app.controller("eventsController", function ($scope) {
        this.tab = 1;

        this.isSet = function (checkTab) {
            return (this.tab === checkTab);
        };

        this.setTab = function (setTab) {
            this.tab = setTab;
        };

        $scope.myDate = new Date();
        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());

        // Time of the event
        $scope.sectionOfTheDay = [
            "Morning", "Day", "Evening", "Afternoon"
        ];

        // Sample events for events page
        $scope.eventsList = [{
            "title":"Event title 1",
            "date":"10/08/2015",
            "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cauctor magna lobortis quis. Vestibulum ncidunt volutpat nisi tellus sit amet ullamcorper mollis.",
            "images":["img/small/assistant.svg", "img/small/astronaut.svg", "img/small/builder.svg"]
            },{
                "title":"Event title 2",
                "date":"10/07/2015",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cauctor magna lobortis quis. Vestibulum ncidunt volutpat nisi tellus sit amet ullamcorper mollis.",
                "images":["img/small/astronaut.svg", "img/small/assistant.svg", "img/small/builder.svg"]
            },{
                "title":"Event title 3",
                "date":"10/06/2015",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cauctor magna lobortis quis. Vestibulum ncidunt volutpat nisi tellus sit amet ullamcorper mollis.",
                "images":["img/small/builder.svg", "img/small/astronaut.svg", "img/small/assistant.svg"]
            },{
                "title":"Event title 4",
                "date":"10/05/2015",
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cauctor magna lobortis quis. Vestibulum ncidunt volutpat nisi tellus sit amet ullamcorper mollis.",
                "images":["img/small/captain.svg", "img/small/astronaut.svg", "img/small/assistant.svg"]
            }
        ];

        $scope.event = {"images":["img1.svg", "img2.svg"]};

        this.upload = function(){
            var files = (document.querySelector('#fileInput')).files;
            if(files[0] != null && files.length > 0){
                console.log(files[0]);
                $scope.event.images.push(files[0].name);
            }
        };

        this.remove = function(imageName){
            console.log(imageName);
            $scope.event.images.pop(imageName);
        }
    });

})();

