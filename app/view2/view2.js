'use strict';



App.controller('View2Ctrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

		$scope.readmore2 = 'readless1';
		$scope.readfunction = function(){
			console.log($scope.readmore2)
			if($scope.readmore2 == 'readless1'){
				console.log(1)
				$scope.readmore2 = 'readmore1';
			}else{
				console.log(2)				
				$scope.readmore2 = 'readless1';
			}
		}
		
		$scope.owlOptionsTestimonials = {
            autoPlay: 4000,
            stopOnHover: true,
            slideSpeed: 100,
            paginationSpeed: 600,
            items: 1
        }

        $scope.owlOptionsTestimonialMulti = {
        	autoPlay: 4000,
            stopOnHover: true,
            slideSpeed: 100,
            paginationSpeed: 600,
            items: 3
        }

		$scope.loadMore = function() {
	        $scope.loading = true
	    	$http({
	    		method:'GET',
	    		url:'https://assignment-appstreet.herokuapp.com/api/v1/products/'+$stateParams.productId
	    	}).success(function(res){
                console.log(res)
                $scope.productInfo = res.primary_product
                process(res)
    			$scope.loading = false
	    	}).error(function(err){
	    		console.log(err)
	    	})
    	};

    	$scope.loadMore()
    
	var similarProducts = [];
	var c = {}
	c.Colour = []
	c.Storage = []
    var process = function(a){
    	
		a.attributes.forEach(function(attr) {
			    var attr_name = attr.name;
			    var product_options = [];
			    a.options.forEach(function(att) {
			        if (att.attrib_id === attr._id) {
			            console.log(attr_name, att.name)
			            c[attr_name].push(att.name)
			            console.log(c)
			            var sameProd = [];
			            var inserted = [];
			            a.product_variations.forEach(function(at) {
			                if (at.sign.includes(att._id)) {
			                    if (inserted.length == 0) {
			                        sameProd.push(at)
			                        inserted.push(at._id)
			                    } else if (!inserted.includes(at._id)) {
			                        sameProd.push(at)
			                        inserted.push(at._id)
			                    }
			                }
			            })
			            product_options.push(...sameProd)
			        }
			    })
			    var obj = {
			        attr_name: attr_name,
			        product_options: product_options
			    }
			    similarProducts.push(obj)
		})
    }
	
	$scope.similarProducts = similarProducts
	$scope.variants = c




}]);