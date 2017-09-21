;(() => {

class ChagePictureModalController {
  constructor($scope, ChangePictureService, Auth) {
    this.$scope = $scope;
    this.ChangePictureService = ChangePictureService;
    this.Auth = Auth;
  }

  $onInit() {

  }

  load() {

  }

  remove() {
    this.image = null;
  }

  upload(file) {
    let img = file.split(',')
    let payload = {
      content: img[1],
      fileName: this.preview.name,
      fileExtension: this.preview.type.substring(6),
    };

    this.isUploading = true;
   
    if (!_.isEmpty(this.resolve.endpoint)) {
     
      this.loadingPromise = this.ChangePictureService.update(this.resolve.endpoint, payload)
      .then((response) => {
        if (this.resolve.endpoint === 'me/pictures') {
      
          this.Auth.changePicture(response.data.profilePicturePath);

          this.modalInstance.close();
        } else {
          this.modalInstance.close('Eclient');
        }
      }).finally(() => {
        this.isUploading = false;
      });
    } else {
      this.modalInstance.close({ image: file,  pay : payload });        

    };


  }

  save(value) {

  }

  cancel(){
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('chagePictureModal', {
    templateUrl: 'app/directives/changePincture/chagePictureModal.html',
    controller: ChagePictureModalController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
