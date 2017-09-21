;(() => {

class RigsNewController {
  constructor(RigService, Rig, Auth) {
    this.RigService = RigService;
    this.Rig = Rig;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Rig({});
    this.loadingPromise = this.getTypes();
  }

  getTypes(keyword) {
    return this.RigService.getTypes(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createItem() {
    this.RigService.createType(this.data.type)
      .then((response) => {
        // Set the new value to the model
        this.data.type = response.data;
        // Reload the list of types
        this.getTypes();
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.RigService.create(this.data.postPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('rigsNew', {
    templateUrl: 'views/rigs/rigs.new.html',
    controller: RigsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
