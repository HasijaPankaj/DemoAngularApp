(function(){
  "use strict";
  angular
    .module("ngClassifieds")
    .controller("signupCtrl", function($scope, $state, $mdToast, localStorageService){
      // Set local storage login credentials
      localStorageService.set('login', {username: 'admin', password: 'admin'});

      localStorageService.set('userLoggedIn', false);
      $scope.$parent.showNavbar = false;    
      $scope.login = function(){
        var loginKey = localStorageService.get("login");
        if(loginKey.username == $scope.username && loginKey.password == $scope.password){
          localStorageService.set('toDoList', []);
          localStorageService.set('inProgressList', []);
          localStorageService.set('doneList', []);

          $state.go("classifieds");
          showToast("Login Successful!!");
          $scope.clearFields();
        }
        else{
          showToast("Wrong credentials!!!!!");
          $scope.clearFields();
        }

      };

      $scope.clearFields = function(){
        $scope.username = "";
        $scope.password = "";
      };

      function showToast(message){
          $mdToast.show(
                  $mdToast.simple()
                      .content(message)
                      .position('top, right')
                      .hideDelay(3000)
              );
      }
    });

})();