;(() => {

class WellboresNewController {
  constructor(WellboreService, Wellbore, Auth) {
    this.WellboreService = WellboreService;
    this.Wellbore = Wellbore;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Wellbore({ well: { id: this.resolve.wellId } });
  }

  getWellboreShapes(keyword) {
    return this.WellboreService.getWellboreShapes(keyword)
      .then((response) => {
        return response.data;
      });
  }

  getTargetFormations(keyword) {
    return this.WellboreService.getTargetFormations(keyword)
      .then((response) => {
        return response.data;
      });
  }

  getWellbores(keyword) {
    return this.WellboreService.getActives(keyword, null, null, this.resolve.wellId)
      .then((response) => {
        return response.data;
      });
  }

  craeteWellboreShape() {
    this.WellboreService.createWellboreShape(this.data.wellboreShape)
      .then((response) => {
        // Set the new value to the model
        this.data.wellboreShape = response.data;
      });
  }

  createTargetFormation() {
    this.WellboreService.createTargetFormation(this.data.targetFormation)
      .then((response) => {
        // Set the new value to the model
        this.data.targetFormation = response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.WellboreService.create(this.data.postPayload())
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

  validatePicklists() {
    return (this.data.wellboreShape && !this.data.wellboreShape.id) || (this.data.targetFormation && !this.data.targetFormation.id) || (this.data.parentWellbore && !this.data.parentWellbore.id);
  }
}

angular.module('app')
  .component('wellboresNew', {
    templateUrl: 'views/wellbores/wellbores.new.html',
    controller: WellboresNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
