var customerDetails = angular.module('customerDetails', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);

customerDetails.controller('mainController', ['$scope', '$http', '$location', 'multipartForm', function($scope, $http, $location, multipartForm) {
    $scope.pageClass = "homePage";
    $scope.formData = {};

    // when landing on the page, get all customer_properties and show them
    $http.get('/api/customer_properties')
        .success(function(data) {
            $scope.customer_properties = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $http.get('/upload')
        .success(function(data) {
            $scope.customer_properties_image = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });



    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/customer_properties', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.customer_properties = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    $scope.Submit = function() {
        var uploadUrl = '/upload';
        multipartForm.post(uploadUrl, $scope.formData)
        .success(function(data) {
                $scope.customer_properties_image = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/customer_properties/' + id)
            .success(function(data) {
                $scope.customer_properties = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);

customerDetails.controller('viewChange', function($scope) {
    $scope.pageClass = "detailsPage";
    $scope.message = "This is new page";
});


customerDetails.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/customerList.html',
            controller: 'mainController'
        }).
        when('/customer-details', {
            templateUrl: '/customerDetails.html',
            controller: 'viewChange'
        }).
        when('/file', {
            templateUrl: '',
            controller: 'mainController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);