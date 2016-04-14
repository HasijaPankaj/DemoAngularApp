(function(){
  "use strict";

    angular
        .module('ngClassifieds')
        .controller("newClassifiedsCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory,$mdToast){
          var vm = this;
          vm.closeSidebar = closeSidebar;
          vm.saveClassified = saveClassified;

          $timeout(function(){
            $mdSidenav("left").open();
          });
          
          $scope.$watch('vm.sidenavOpen', function(sidenav){
            
            if(sidenav === false){
              $mdSidenav('left')
                .close()
                .then(function(){
                   $state.go('classifieds');
                });
            }
          });

          function closeSidebar(){
            vm.sidenavOpen = false;
          }
            function showToast(message){
                  $mdToast.show(
                          $mdToast.simple()
                              .content(message)
                              .position('center, center')
                              .hideDelay(3000)
                      );
                 }
          function saveClassified(classified){
            console.log('Save classifieds');
            if(classified.title){
              classified.contact = {
                name: "test user",
                phone: "(555) 555-5555",
                email: "testuser@gmail.com"
              }
              $scope.$emit('newClassified', classified);
              vm.sidenavOpen = false;   
            }
              else{
                  showToast("Classified's title is required!!");
              }
          }
        });

})();