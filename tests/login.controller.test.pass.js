describe('Testing the Login Module:', function () {
    
    var url = "http://10.0.12.26:3000/users/login_user.json?user"
    var userData = "%7B%22email%22%3A%22pankaj%40harbingergroup.com%22%2C%22password%22%3A%22admin%40123%22%7D";
    
    var $controller, $scope, controller;
    beforeEach(module('ngClassifieds'));
    
    beforeEach(inject(function(_$controller_, _$httpBackend_, $rootScope){
         $controller = _$controller_;
         $scope = {};
         $httpBackend = _$httpBackend_;
         $scope =  $rootScope.$new();
        
      }));
    
    it('should respond with success', inject(function($http) {
    var $scope = {};
    /*Code under test*/
        $scope.user = {
            email: 'pankaj@harbingergroup.com',
            password: 'admin@123'  
          };
    $http.post(url, userData).then(function success(response) {
              $scope.response = response;
              if(response.data.status == 'success')
                  {
                    console.log(response.data.status);
                    // $state.go("classifieds");
                    // showToast("Login Successfull!!");
                  }
                  else
                  {
                    console.log(response.data.status);
                   // showToast("Wrong credentials!!!!!");
                  }
            }, function error(response) {
              console.log('connection failed');
              showToast("Unable to establish connection!!");
            });
    /*Code ends*/
   
  
        var $scope = {};
        

        $httpBackend
            .when('POST', url, userData)
            .respond({
                    "status": "success",
                    "auth_token": "cb9c2df8a58fe86a3f7f5ba055"
                });
         
          $httpBackend.flush();
          expect($scope.response.data.status).toEqual('success');

    }));
});