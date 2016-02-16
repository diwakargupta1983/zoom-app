(function() {
    angular.module('landing', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/', {
                    templateUrl: '/views/landing.html',
                    controller: 'landingController',
                    controllerAs: 'landing'
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
        .controller('landingController', ['$scope', '$location', function ($scope, $location) {
            
            $scope.navLinks = [{
                LinkText: 'Dashboard',
                url: 'dashboard',
                iconClass: 'fa-dashboard'
            }, {
                LinkText: 'Add Customer',
                url: 'add-customer',
                iconClass: 'fa-user-plus'
            }, {
                LinkText: 'Search Customers',
                url: 'search-customer',
                iconClass: 'fa-search'
            }, {
                LinkText: 'Customer Details',
                url: 'customer-details',
                iconClass: 'fa-edit'
            }, {
                LinkText: 'UI Elements',
                url: 'aasd',
                iconClass: 'fa-list-alt'
            }, {
                LinkText: 'Widgets',
                url: 'qweqwe',
                iconClass: 'fa-puzzle-piece'
            }, {
                LinkText: 'Components',
                url: 'dgdg',
                iconClass: 'fa-gears'
            }, {
                LinkText: 'Tables',
                url: 'rwer',
                iconClass: 'fa-table'
            }, {
                LinkText: 'Typography',
                url: 'vbnn',
                iconClass: 'fa-font'
            }];

            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || '';
                return page === currentRoute ? 'active' : '';
            };  

        }]);
})();
