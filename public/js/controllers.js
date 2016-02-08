var customerDetails = angular.module('customerDetails', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);

customerDetails.controller('mainController', ['$scope', '$http', '$location', 'multipartForm', '$uibModal', function($scope, $http, $location, multipartForm, $uibModal) {
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

    $scope.deleteFile = function(id) {
        $http.delete('/upload/' + id)
            .success(function(data) {
                $scope.customer_properties_image = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    /* Date Picker */
    $scope.popup1 = {
        opened: false
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd MMM yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };


    /* UI Dialog */
     $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;

  $scope.open = function (size, imgSrc, imgDesc) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
        imageSrcToUse: function () {
                return "http://localhost:8000/file/" + imgSrc;      // Hardcoded server path
            },
        imagesDescription: function(){
            return imgDesc;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

}]);

customerDetails.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, imageSrcToUse, imagesDescription) {

    
                $scope.ImageSrc = imageSrcToUse;
                $scope.ImageDesc = imagesDescription;
            

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

customerDetails.controller('TabsCtrl', function ($scope, $window) {
    $scope.data = {};
});

customerDetails.controller('viewChange', function($scope) {
    $scope.pageClass = "detailsPage";
    $scope.message = "This is new page";
});

/* Date Picker */




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