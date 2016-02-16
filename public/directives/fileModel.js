app.directive('fileModel', ['$parse', function($parse){
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