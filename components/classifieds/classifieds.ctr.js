(function(){
    angular
        .module('ngClassifieds')
        .controller("classifiedsCtrl", function($scope, $http, $state, $mdSidenav, $mdToast, $mdDialog, classifiedsFactory, localStorageService){
            var vm = this;
            $scope.$parent.inClassifeds = true; 
            $scope.$parent.showNavbar = true;
            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar = closeSidebar;
            vm.editing;
            vm.openSidebar = openSidebar;
           
            // Get classifieds from firebase database
            vm.classifieds = classifiedsFactory.ref;

            vm.logOut = logOut;
            vm.loadToDoList = loadToDoList;

            $scope.$parent.showFilter = function(){
                if(!$scope.showFilters)    
                    $scope.showFilters = true;
                else
                    $scope.showFilters = false;
            };
            
            // Load categories
            vm.classifieds.$loaded().then(function(classifieds){
                vm.categories = getCategories(classifieds);
            });

            $scope.$on('newClassified', function(event, classified){
                // classified.id = vm.classifieds.length + 1;
                // vm.classifieds.push(classified);
                vm.classifieds.$add(classified);
                showToast('Classified Saved');
            });

            $scope.$on('editSaved', function(event, message){
               showToast(message); 
            });

            var contact = {
                name: "test user",
                phone: "(555) 555-5555",
                email: "testuser@gmail.com"
            }
            
            function openSidebar(){
               $state.go("classifieds.new");
            }
            
            function closeSidebar(){
                $mdSidenav("left").close();
            }
            
           
            
            function showToast(message){
                $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position('top, right')
                            .hideDelay(3000)
                    );
            }
        
        function getCategories(classifieds){
            var categories = [];
            angular.forEach(classifieds, function(item){
                angular.forEach(item.categories, function(category){
                    categories.push(category);
                })
            })
            return _.uniq(categories);
        }

        function logOut(){
            $state.go("login");
        }

        function loadToDoList(){
            console.log("Function loadToDoList called");
            $state.go("toDoList");
        }

    });
})();