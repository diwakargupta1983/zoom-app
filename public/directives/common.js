(function(){
    angular.module('common-directives', [])
        .directive('redir', ['$http', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        e.preventDefault();
                        window.location = attrs.href;
                    });
                }
            }
        }])
        .directive('logout', ['$http', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        e.preventDefault();
                        $http.post('/logout');
                    });
                }
            }
        }])
        .directive('fileModel', ['$parse', function($parse){
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
        }])
        .filter('DDMMYYY', function($filter) {
            return function(input)
            {
                if(input == null){ 
                    return ""; 
                }  
                var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
                return _date.toUpperCase();
            };
        })
        .filter('DDMMMYYYY', function($filter) {
            return function(input)
            {
                if(input == null){ 
                    return ""; 
                } 
                var _date = $filter('date')(new Date(input), 'dd MMM yyyy');
                return _date.toUpperCase();
            };
        });








})();