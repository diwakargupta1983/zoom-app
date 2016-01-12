customerDetails.directive('fileModel', ['$parse', function($parse){
	fileModelDirective = {};
	
	fileModelDirective.restrict = 'A',
	fileModelDirective.link = function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			
			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			});
		}
	
	return fileModelDirective;
}]);

//Datepicker
customerDetails.directive('zmDatepickerDob', function(){
	var zmDatepickerDobDirective = {};
	
	zmDatepickerDobDirective.restirct = 'EA',
	zmDatepickerDobDirective.template = '<p class="input-group"><input type="text" class="form-control" id="dob" placeholder="Date of Birth" ng-model="formData.dob" uib-datepicker-popup="{{format}}" is-open="status.opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></p>'
	zmDatepickerDobDirective.controller = ['$scope', function($scope){
		$scope.today = function() {
			$scope.dt = new Date();
		};
		
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		/* $scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		}; */

		$scope.toggleMin = function() {
			$scope.minDate = new Date(1947, 7, 15)
		};
	  
		$scope.toggleMin();
		
		$scope.maxDate = new Date();

		$scope.open = function($event) {
			$scope.status.opened = true;
		};

		$scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
		$scope.format = $scope.formats[2];

		$scope.status = {
			opened: false
		};

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 2);
		$scope.events =
			[
				{
					date: tomorrow,
					status: 'full'
				},
				{
					date: afterTomorrow,
					status: 'partially'
				}
			];

		$scope.getDayClass = function(date, mode) {
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);
				for (var i=0;i<$scope.events.length;i++){
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}
			return '';
		};
	}]
	return zmDatepickerDobDirective;
});