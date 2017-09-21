;(() => {

let link = ($scope, element, attrs, api) => {
  $scope.$watch('toWatch', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      api.$setDirty();
    }
  }, true);
};

angular.module('app')
  .directive('setDirty', () => ({
    restrict: 'A',
    require:'?^form',
    link: link,
    scope: {
      toWatch: '=setDirty'
    },
  }));

})();
