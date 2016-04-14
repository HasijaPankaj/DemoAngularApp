(function(){
  "use strict";
  angular
    .module("ngClassifieds")
    .controller('loginCtrl', function($scope, $state, $mdToast, localStorageService, $http){
      // Set local storage login credentials
      localStorageService.set('login', {username: 'admin', password: 'admin'});

      localStorageService.set('userLoggedIn', false);
      $scope.$parent.showNavbar = false;    
      
      //login
      $scope.login = function(){
          $scope.user = {
            email: 'pankaj@gmail.com',
            password: 'admin@123'  
          };
          //console.log($scope.user);
        /*var loginKey = localStorageService.get("login");
        if(loginKey.username == $scope.user.username && loginKey.password == $scope.user.password){
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
        }*/

          $http.post('http://10.0.10.95:3000/users/login_user.json?user='+JSON.stringify($scope.user)).then(function success(response) {
              $scope.response = response;
              if(response.data.status == 'success')
                  {
                    $state.go("classifieds");
                    showToast("Login Successfull!!");
                  }
                  else
                  {
                    showToast("Wrong credentials!!!!!");
                  }
            }, function error(response) {
              console.log('connection failed');
              showToast("Unable to establish connection!!");
            });
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
     
      //invoke login for testing
      //$scope.login();
    });

})();