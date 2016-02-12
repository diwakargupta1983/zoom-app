var customerDetails = angular.module('customerDetails', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'datatables', 'ngResource']);

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



    // when submitting the add form, send the text to the node API and upload the file
    $scope.createTodo = function(dobYear, dobMonth, dobDay) {
        var utcDob = new Date(Date.UTC(dobYear, dobMonth - 1, dobDay));
        $scope.formData.dob = utcDob;
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

    // delete a customer data and related file after checking it
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
    $scope.formats = [
      'dd-MMMM-yyyy', 
      'yyyy/MM/dd', 
      'dd MMM yyyy', 
      'shortDate'
    ];
    $scope.format = $scope.formats[2];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };


    $scope.months = [
      {value: 1, name: "january (01)"},
      {value: 2, name: "February (02)"},
      {value: 3, name: "March (03)"},
      {value: 4, name: "April (04)"},
      {value: 5, name: "May (05)"},
      {value: 6, name: "June (06)"},
      {value: 7, name: "July (07)"},
      {value: 8, name: "August (08)"},
      {value: 9, name: "September (09)"},
      {value: 10, name: "October (10)"},
      {value: 11, name: "November (11)"},
      {value: 12, name: "December (12)"}
    ];

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


/* Controller for Datatable */
customerDetails.controller('AngularWayWithOptionsCtrl', AngularWayWithOptionsCtrl);

function AngularWayWithOptionsCtrl($resource, DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    vm.data = [];
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2);
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
       // DTColumnDefBuilder.newColumnDef(1).notVisible(),
        DTColumnDefBuilder.newColumnDef(6).notSortable()
    ];
    $resource('/api/customer_properties').query().$promise.then(function(data) {
        vm.data = data;
    });
}

/* Controller for left navigation */
customerDetails.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.navLinks = [{
        LinkText: 'Dashboard',
        url: '',
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


customerDetails.controller('viewChange', function($scope) {
    $scope.pageClass = "detailsPage";
    $scope.message = "This is new page";
});





customerDetails.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            title: "Dashboard",
            subtitle: "the first priority information",
            templateUrl: '/dashboard.html',
            controller: 'mainController'
        }).
        when('/add-customer', {
            title: "Customer Details",
            subtitle: "add details about cutomer",
            templateUrl: '/addCustomer.html',
            controller: 'mainController'
        }).
        when('/customer-details', {
            title: "Customer Details",
            subtitle: "customer details heading",
            templateUrl: '/customerDetails.html',
            controller: 'viewChange'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

customerDetails.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title;
        $rootScope.subtitle = $route.current.subtitle;
    });
}]);