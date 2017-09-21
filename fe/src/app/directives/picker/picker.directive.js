;(() => {

angular.module('app')
  .directive('picker', () => ({
    templateUrl: 'app/directives/picker/picker.html',
    restrict: 'E',
    // controller: 'PickerController',
    link: ($scope, element, attrs, api) => {
      // Defaults
      $scope.idAttr = !_.isEmpty($scope.idAttr) ? $scope.idAttr : 'id';
      $scope.titleAttr = !_.isEmpty($scope.titleAttr) ? $scope.titleAttr : '$index';
      $scope.subtitleAttr = !_.isEmpty($scope.subtitleAttr) ? $scope.subtitleAttr : null;
      $scope.pickerIcon = !_.isEmpty($scope.pickerIcon) ? $scope.pickerIcon : 'fa-list-ul';
      $scope.reverse = !_.isEmpty($scope.reverse) ? $scope.reverse === 'true' : false;
      $scope.selectLastItem = !_.isEmpty($scope.selectLastItem) ? $scope.selectLastItem === 'true' : false;

      $scope.setItem = (item) => {
        if (_.isEmpty(item)) {
          return;
        }
        $scope.itemSelected = item;
        // Call back
        if (_.isFunction($scope.pickerOnChange)) {
          $scope.pickerOnChange({ '$item': item });
        }
      };

      $scope.$watch('pickerList', (newValue, oldValue) => {
        if ($scope.selectLastItem) {
          $scope.setItem(_.last($scope.pickerList));
        } else {
          $scope.setItem(_.first($scope.pickerList));
        }
      }, true);
    },
    scope: {
      pickerList: '=pickerList',
      itemSelected: '=ngModel',
      pickerOnChange: '&pickerOnChange',
      titleAttr: '@titleAttr',
      subtitleAttr: '@subtitleAttr',
      idAttr: '@idAttr',
      pickerIcon: '@pickerIcon',
      reverse: '@reverse',
      selectLastItem: '@selectLastItem',
    },
  }));

})();
