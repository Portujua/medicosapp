;(() => {

class ChangePictureController {
  constructor($scope, StorageService, Auth) {
    this.$scope = $scope;
    this.StorageService = StorageService;
    this.Session = Auth.getSession();
  }

  $onInit(){

  }
}

angular.module('app')
  .controller('ChangePictureController', ChangePictureController);

})();
