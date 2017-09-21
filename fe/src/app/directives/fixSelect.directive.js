/**
 * Workaround for Angular (issue #1019)[https://github.com/angular/angular.js/issues/1019]
 * Apply like this:
 * <select ng-model="data.kindOfCheese">...</select>
 * -> <select fix-select ng-model="data.kindOfCheese">...</select>
 */
angular.module('app')
  .directive('select', () => {
    return {
      restrict: 'E',
      link: ($scope, element, attrs) => {
        let model = $scope;
        // only works with model references in this format: "data.test"
        attrs.ngModel.split('.').forEach((part) => {
          model = model[part];
        });

        $scope.$watch(() => {
          return element.children().length;
        }, () => {
          $scope.$evalAsync(() => {
            // Remove all options with value === "?"
            _.each(element.children(), (item, key, list) => {
              if (item.value === '?') {
                item.remove();
              }
            });

            // iterate through <option>s
            Array.prototype.some.call(element.children(), (child) => {
            	if (!_.isNull(model) && !_.isUndefined(model)) {
                if (model.$$hashKey) {
              		delete model.$$hashKey;
              	}
              }

              if (child.value === JSON.stringify(model)) {
                child.setAttribute('selected', 'selected');
              } else {
                // For ng-options all options have a label
                if (child.label) {
                  // Go through all model attrs
                  for (let key in model) {
                    if (model.hasOwnProperty(key)) {
                      // If the value === to his child.label
                      if (model[key] === child.label) {
                        child.setAttribute('selected', 'selected');
                      }
                    }
                  }
                }
              }
              // prevent select from being stuck and remove phantom option.
              // in a setTimeout to run after digest cycle.
              setTimeout(() => element.triggerHandler('change'), 0);

              return false;
            });
          });
        });
      }
    };
  });
