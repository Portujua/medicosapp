;(() => {

angular.module('app')
  .directive('etree', ($compile, $timeout) => ({
    templateUrl: 'app/directives/etree/etree.html',
    restrict: 'E',
    controller: 'ETreeController',
    controllerAs: '$ctrl',
    replace: true,
    link: ($scope, element, attrs, api) => {
      $scope.$watch('data', (data) => {
        $scope.data = data;
        $scope.data_ = data;
      })

      $scope.$watch('promise', (promise) => {
        $scope.promise = promise;
      })

      // $scope.$watch('filter', (filter) => {
      //   $scope.filter = filter;

      //   $scope.doFilter($scope.filter);
      // })
    },
    scope: {
      addFn: '&',
      toggleFn: '&',
      removeFn: '&',
      editFn: '&',
      data: '=',
      labelField: '@',
      labelClass: '@',
      descriptionField: '@',
      descriptionClass: '@',
      title: '@',
      titleClass: '@',
      hideToggle: '=',
      hideAdd: '=',
      hideRemove: '=',
      hideEdit: '=',
      childrenField: '@',
      loadedField: '@',

      addBtnClass: '@',
      removeBtnClass: '@',
      toggleBtnClass: '@',
      editBtnClass: '@',
      promise: '=',
      clickFn: '&',
      showFilter: '=',

      reloadFn: '&',
      showReload: '='
    },
  }));

})();
