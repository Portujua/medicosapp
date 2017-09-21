angular.module('app')
  .run(($rootScope, $http, $log, $window) => {
    // Checking internet connection
    $rootScope.isOnline = navigator.onLine;
    $window.addEventListener('offline', () => {
      $rootScope.$apply(() => {
        $rootScope.isOnline = false;
      });
    }, false);

    $window.addEventListener('online', () => {
      $rootScope.$apply(() => {
        $rootScope.isOnline = true;
      });
    }, false);
  });
