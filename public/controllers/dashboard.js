(function() {
    angular.module('dashboard', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/dashboard', {
                    templateUrl: '/views/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'dashboard'
                });
                
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
        .controller('dashboardController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
           
        }]);
})();
