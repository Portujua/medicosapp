;(() => {

angular.module('app')
  .directive('notFound', () => ({
    template: `
      <div class="text-center bold text-muted padding margin-tb" ng-if="expression">
        {{ message | available:'There is nothing to show.' }}
      </div>
    `,
    restrict: 'E',
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      message: '@',
      expression: '='
    },
  }));

})();
