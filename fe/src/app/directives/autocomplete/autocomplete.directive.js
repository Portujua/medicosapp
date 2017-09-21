/*
* Modified from: 
* http://stackoverflow.com/questions/34103417/how-to-get-selected-value-from-ng-autocomplete-directive-to-controller
*/

angular.module('app').factory('ngAutocompleteService', ['$http', function($http) 
{
  let self = this;
  self.getData = function (url, keyword) {
    return $http.get(url, { query: keyword });
  };

  return self;
}])

angular.module('app').directive('ngAutocomplete', ['$timeout','$filter','ngAutocompleteService', 

function($timeout, $filter, ngAutocompleteService)
 {

  'use strict';

  let keys = {
    left    : 37,
    up      : 38,
    right   : 39,
    down    : 40,
    enter   : 13,
    esc     : 27
  };

  let setScopeValues = function (scope, attrs) {
    scope.searchProperty = attrs.searchProperty || '[scope.searchProperty]';
    scope.maxResults = attrs.maxResults || 10;
    scope.delay = parseInt(attrs.delay, 10) || 300;
    scope.minLenth = parseInt(attrs.minLenth, 10) || 2;
    scope.allowOnlyResults = scope.$eval(attrs.allowOnlyResults) || false;
    scope.placeholder = attrs.placeholder || 'Search...';
    //scope.data = attrs.data || [];
  };

  let delay = (function() {
    let timer = 0;
    return function (callback, ms) {
      $timeout.cancel(timer);
      timer = $timeout(callback, ms);
    };
  })();

  return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
      	data: '=',
          required: '='
      },
      link: function(scope, element, attrs, ngModel) {
        setScopeValues(scope, attrs);

        scope.results = [];
        scope.currentIndex = null;

        scope.$watch('data', (data) => {
          scope.data = data;
        })

        scope.getResults = function () {
          if (parseInt(scope.keyword.length, 10) === 0) {
            scope.results = [];
          }
          
          if (scope.keyword.length < scope.minLenth) {
            return;
          }

          delay(function() {
            scope.results = [];

            let filtered = _.filter(scope.data, (r) => {
            	return r[scope.searchProperty].toUpperCase().indexOf(scope.keyword.toUpperCase()) > -1;
            });;

            if (filtered.length > scope.maxResults) {
              for (let i = 0; i < scope.maxResults; i++) {
                scope.results.push(filtered[i]);
              }
            }
            else {
            	scope.results = filtered;
            }

            scope.currentIndex = 0;

            if (scope.results.length) {
              scope.showResults = true;
            }

          }, scope.delay);
        };

        scope.selectResult = function (r) {
          scope.keyword = r[scope.searchProperty];
          ngModel.$setViewValue(r);
          scope.ngModel = r;
          ngModel.$render(); 
          scope.showResults = false;
        };

        scope.clearResults = function () {
          scope.results = [];
          scope.currentIndex = null;
        };

        scope.hoverResult = function (i) {
          scope.currentIndex = i;
        }

        scope.blurHandler = function () {
          $timeout(function() {
            if (scope.allowOnlyResults) {
              let find = _.filter(scope.data, (r) => {
                return r[scope.searchProperty].toUpperCase().indexOf(scope.keyword.toUpperCase()) > -1;
              });;
              
              if (!find.length) {
                scope.keyword = '';
                ngModel.$setViewValue('');
              }
            }
            scope.showResults = false;
          }, 100);
        };

        scope.keyupHandler = function (e) {
          let key = e.which || e.keyCode;

          if (key === keys.enter) {
            scope.selectResult(scope.results[scope.currentIndex]);
          }

          if (key === keys.left || key === keys.up) {
            if (scope.currentIndex > 0) {
                scope.currentIndex -= 1;
            }
          }

          if (key === keys.right || key === keys.down) {
            if (scope.currentIndex < scope.maxResults - 1) {
                scope.currentIndex += 1;
            }
          }

          if (key === keys.esc) {
            scope.keyword = '';
            ngModel.$setViewValue('');
            scope.clearResults();
          }
        };
      },
      template:
      '<input type="text" class="form-control" ng-model="keyword" placeholder="{{placeholder}}" ng-change="getResults()" ng-keyup="keyupHandler($event)" ng-blur="blurHandler()" ng-focus="currentIndex = 0" autocorrect="off" autocomplete="off">' +
      '<input type="hidden" ng-model="skillIdToBeRated">'+
      '<div class="autocomplete-results" ng-show="showResults">' +
      '  <div class="autocomplete-result" ng-repeat="r in results" ng-click="selectResult(r)" ng-mouseover="hoverResult($index)" ng-class="{\'hover\': $index === currentIndex}">' +
      '    {{ r[searchProperty] }}' +
      '  </div>' +
      '</div>'
  };
}]);