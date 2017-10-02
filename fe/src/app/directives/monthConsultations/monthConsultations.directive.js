;(() => {

angular.module('app')
  .directive('monthConsultations', () => ({
    templateUrl: 'app/directives/monthConsultations/monthConsultations.html',
    restrict: 'E',
    controller: 'MonthConsultationsController',
    controllerAs: '$ctrl',
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      
    },
    bindToController: true,
  }));

})();
