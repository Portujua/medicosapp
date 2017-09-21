;(() => {

angular.module('app')
  .directive('collapsableText', ($compile) => ({
    restrict: 'A',
    link: ($scope, element, attrs, api) => {
      // start collapsed
      $scope.collapsed = false;

      // create the function to toggle the collapse
      $scope.toggle = function() {
        $scope.collapsed = !$scope.collapsed;
      };

      // wait for changes on the text
      attrs.$observe('collapsableText', (text) => {
        // get the length from the attributes
        let maxLength = $scope.$eval(attrs.maxlength) || 100;

        if (text.length > maxLength) {
          // split the text in two parts, the first always showing
          let firstPart = String(text).substring(0, maxLength);
          let secondPart = String(text).substring(maxLength, text.length);

          // create some new html elements to hold the separate info
          let firstSpan = $compile(`<span>${firstPart}</span>`)($scope);
          let secondSpan = $compile(`<span ng-if="collapsed">${secondPart}</span>`)($scope);
          let moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')($scope);
          let lineBreak = $compile('<br ng-if="collapsed">')($scope);
          let toggleButton = $compile('<a href="" class="collapse-text-toggle" ng-click="toggle()">({{ collapsed ? "less" : "more" }})</a>')($scope);

          // remove the current contents of the element
          // and add the new ones we created
          element.empty();
          element.append(firstSpan);
          element.append(secondSpan);
          element.append(moreIndicatorSpan);
          element.append(lineBreak);
          element.append(toggleButton);
        }
         else {
          element.empty();
          element.append(text);
        }
      });
    },
    scope: true,
  }));

})();


