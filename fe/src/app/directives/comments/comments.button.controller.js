;(() => {

class CommentsController {
  constructor($scope, CommentsService) {
    this.$scope = $scope;
    this.CommentsService = CommentsService;
    this.buttonClass = $scope.buttonClass ? $scope.buttonClass : 'btn-default';
    this.count = 0;

    $scope.$watch('id', (id) => {
      if (!_.isEmpty(id)) {
        this.CommentsService.getCounter(id)
          .then((response) => {
            this.count = response.data;
          });
      }
    }, true);
  }

  $onInit(){

  }

  open() {
    this.CommentsService.open(this.$scope.id)
      .then((response) => {
        this.count = this.count + response;
      });
  }
}

angular.module('app')
  .controller('CommentsController', CommentsController);

})();
