(function(){
  "use strict";

    angular
        .module('ngClassifieds')
        .controller("editClassifiedsCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){
          var vm = this;
          vm.classifieds = classifiedsFactory.ref;

          vm.closeSidebar = closeSidebar;
          vm.saveEdit = saveEdit;
          vm.classified = vm.classifieds.$getRecord($state.params.id);
          
          $timeout(function(){
            $mdSidenav("left").open();
          });
          
          $scope.$watch('vm.sidenavOpen', function(sidenav){
            console.log('sidenav');
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

          function saveEdit(classified){
            vm.classifieds.$save(vm.classified).then(function(){
              $scope.$emit('editSaved', 'Edit Saved!');
              vm.sidenavOpen = false;  
            });
          }
        });

})();