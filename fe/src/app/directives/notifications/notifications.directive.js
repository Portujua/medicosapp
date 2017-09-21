;(() => {

angular.module('app')
  .directive('notifications', () => ({
    templateUrl: 'app/directives/notifications/notifications.html',
    restrict: 'E',
    replace: true,
    controller: 'NotificationsController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    scope: true,
  }));

})();
