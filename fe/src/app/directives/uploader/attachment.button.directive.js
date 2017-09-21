;(() => {

angular.module('app')
  .directive('attachment', (UploaderService) => ({
    templateUrl: 'app/directives/uploader/attachment.button.html',
    restrict: 'E',
    controller: 'AttachmentController',
    controllerAs: '$ctrl',
    replace: true,
    link: ($scope, element, attrs, api) => {

    },
    scope: {
      id: '=',
      buttonClass: '@',
    },
  }));

})();
