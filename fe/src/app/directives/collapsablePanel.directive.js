;(() => {

angular.module('app')
  .directive('collapsablePanel', () => ({
    template: `
    <button class="btn btn-collapsable btn-link padding-xs" uib-tooltip="Toggle Information Panel" tooltip-placement="right" tooltip-append-to-body="true">
      <i class="fa" ng-class="{ 'fa-caret-right': isCollapsed, 'fa-caret-left': !isCollapsed }"></i>
    </<button>`,
    restrict: 'E',
    replace: true,
    link: ($scope, element, attrs, api) => {
      $scope.isCollapsed = false;

      let el = element[0],
          parent = angular.element(el.parentElement),
          info = element.next(),
          details = info.next();

      if (parent.length && parent.hasClass('row')) {
        parent.addClass('align-items-start collapsable-row')
      }

      if (details.length) {
        // Remove all classes
        details.removeClass();
        // Find complements
        if (info.length) {
          let classes = info[0].className.split(' ');

          _.each(classes, (value) => {
            if (s.startsWith(value, 'col')) {
              let pos = _.lastIndexOf(value, '-'),
                  name = value.substr(0, pos),
                  number = parseInt(value.substr(pos + 1, value.length));

              if (_.isNaN(number) || number === 12) {
                // To avoid "col-0" classes
                number = 0;
              }

              // Add complement class
              details.addClass(`${name}-${12 - number}`);
            }
          });
        }
      }

      element.on('click', () => {
        $scope.$apply(() => {
          // Toggle
          $scope.isCollapsed = !$scope.isCollapsed;

          if (info.length) {
            info.toggleClass('hide', $scope.isCollapsed);
          }

          if (details.length) {
            // Full width
            details.toggleClass('col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12', $scope.isCollapsed);
          }
        });
      });
    },
    scope: true,
  }));

})();
