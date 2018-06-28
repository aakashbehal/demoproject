'use strict';


App.controller('View1Ctrl', ['$scope', '$http','toastr',function($scope, $http, toastr) {
    $scope.loading = false
    $scope.owlOptionsTestimonials = {
            autoPlay: 4000,
            stopOnHover: true,
            slideSpeed: 300,
            paginationSpeed: 600,
            items: 1
        }

    
	$scope.items = [];
    var counter = 1;
    $scope.loadMore = function() {
        $scope.loading = true
    	$http({
    		method:'GET',
    		url:'https://assignment-appstreet.herokuapp.com/api/v1/products?page='+counter
    	}).success(function(res){
            if(res.products.length){
                res.products.forEach(function(product){
                    $scope.items.push(product);
                })
                console.log( $scope.items)
                if(counter > 1){
                    toastr.success('New Products Added');
                }
                
                counter++
            }
    		$scope.loading = false
    	}).error(function(err){
    		console.log(err)
    	})

       
    };
    
    $scope.loadMore();
}])

App.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
})
App.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
              // provide any default options you want
                var defaultOptions = {
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                console.log(customOptions)
                // combine the two options objects
                for(var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }

                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
})
App.directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);