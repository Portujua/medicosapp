;(() => {

class AttachmentController {
  constructor($scope, UploaderService) {
    this.$scope = $scope;
    this.UploaderService = UploaderService;
    this.buttonClass = $scope.buttonClass ? $scope.buttonClass : 'btn-default';
    this.count = 0;

    $scope.$watch('id', (id) => {
      if (!_.isEmpty(id)) {
        this.UploaderService.getCounter(id)
          .then((response) => {
            this.count = response.data;
          });
      }
    }, true);
  }

  $onInit(){

  }

  open() {
    this.UploaderService.open(this.$scope.id)
      .then((response) => {
        this.count = this.count + response;
      });
  }
}

angular.module('app')
  .controller('AttachmentController', AttachmentController);

})();
