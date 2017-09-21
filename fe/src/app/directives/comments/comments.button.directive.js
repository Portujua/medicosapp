;(() => {

angular.module('app')
  .directive('comments', () => ({
    templateUrl: 'app/directives/comments/comments.button.html',
    restrict: 'E',
    controller: 'CommentsController',
    controllerAs: '$ctrl',
    replace: true,
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      id: '=',
      buttonClass: '@',
    },
  }));

})();
