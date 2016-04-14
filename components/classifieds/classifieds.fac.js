(function(){
    
    "use strict";
    angular
      .module('ngClassifieds')
      .factory('classifiedsFactory', function($http, $firebaseArray){
        
        var ref = new Firebase("https://classifiedsapp7.firebaseio.com/");

        function getClassifieds(){
            return $http.get('data/classified_data.json');
        }
        
        return{
            ref : $firebaseArray(ref)
        }
    });
    
})();