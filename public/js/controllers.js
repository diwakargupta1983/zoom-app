var customerDetails = angular.module('customerDetails', ['ui.bootstrap']);

customerDetails.controller('mainController', ['$scope', '$http', 'multipartForm', function ($scope, $http, multipartForm) {
    $scope.formData = {};
    
    // when landing on the page, get all customer_properties and show them
    $http.get('/api/customer_properties')
        .success(function(data) {
            $scope.customer_properties = data;
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
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
	
	$scope.Submit = function(){
		var uploadUrl = '/upload';
		multipartForm.post(uploadUrl, $scope.formData);
	}

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/customer_properties/' + id)
            .success(function(data) {
                $scope.customer_properties = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);