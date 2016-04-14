(function(){
  angular.module("ngClassifieds", ['ngMaterial', 'ngAnimate', 'ui.router', 'firebase', 'LocalStorageModule'])
    .config(function($mdThemingProvider, $stateProvider, localStorageServiceProvider, $urlRouterProvider){
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');

      
      localStorageServiceProvider
        .setPrefix('ngClassifieds')
        .setStorageType('sessionStorage')
        .setStorageCookieDomain('')
        .setNotify(true, true);
       $urlRouterProvider.otherwise('/login');
      $stateProvider
      .state('login',{
          url: '/login',
          templateUrl: 'components/login/login.tpl.html',
          controller: 'loginCtrl'
        })
          .state('signup',{
          url: '/signup',
          templateUrl: 'components/login/sign_up.tpl.html',
          controller: 'signupCtrl'
        })
        .state('classifieds',{
          url: '/classifieds',
          templateUrl: 'components/classifieds/classifieds.tpl.html',
          controller: 'classifiedsCtrl as vm'
        })
        .state('classifieds.new',{
          url: '/new',
          templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
          controller: 'newClassifiedsCtrl as vm'
        })
        .state('classifieds.edit',{
          url: '/:id/edit',
          templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
          controller: 'editClassifiedsCtrl as vm',
          params: {
            classified: null
          }
        });
    });
})();