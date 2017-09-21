;(() => {

let link = ($scope, element, attrs, api) => {
  api.$pristine = false;
};

angular.module('app')
  .directive('noDirtyCheck', () => ({
    restrict: 'A',
    require: 'ngModel',
    link: link,
  }));

})();
