;(() => {

class ChangePictureController {
  constructor($scope, ChangePictureService, StorageService, Auth, UserService) {
    this.$scope = $scope;
    this.ChangePictureService = ChangePictureService;
    this.StorageService = StorageService;
    this.Session = Auth.getSession();
    this.UserService = UserService;
  }

  $onInit(){

  }

  open(urlPicture, endpoint) {
    this.ChangePictureService.open(urlPicture, endpoint)
    	.then((response) => {
        if (response) {
          this.$scope.load();
        };
        if (response !== 'Eclient'){
            this.$scope.pic= response;
        }

      });
  }
}

angular.module('app')
  .controller('ChangePictureController', ChangePictureController);

})();
