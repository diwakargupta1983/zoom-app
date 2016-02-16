(function() {
    var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'datatables', 'ngResource', 'datatables.bootstrap', 'datatables.tabletools', 'login', 'dashboard', 'landing', 'addCustomer', 'httpFactory', 'common-directives', 'angular-growl']);

    app.run(['$rootScope', '$route', function($rootScope, $route) {
	    $rootScope.$on('$routeChangeSuccess', function() {
	        $rootScope.title = $route.current.title;
	        $rootScope.subtitle = $route.current.subtitle;
	    });
	}]);
	app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, imageSrcToUse, imagesDescription) {

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
})();