;(() => {

class RigsEditController {
  constructor(RigService, Rig, Auth) {
    this.RigService = RigService;
    this.Rig = Rig;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Rig({});
    this.loadingPromise = this.load();
  }

  load() {
    return this.RigService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Rig(response.data);
      });
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
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.RigService.update(this.data.id, this.data.putPayload())
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
  .component('rigsEdit', {
    templateUrl: 'views/rigs/rigs.edit.html',
    controller: RigsEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
