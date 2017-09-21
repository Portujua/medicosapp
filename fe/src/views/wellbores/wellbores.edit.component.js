;(() => {

  class WellboresEditController {
    constructor(WellboreService, Wellbore, Auth) {
      this.WellboreService = WellboreService;
      this.Wellbore = Wellbore;
      this.session = Auth.getSession();
    }

    $onInit() {
      this.data = new this.Wellbore({});
      this.loadingPromise = this.load();
    }

    load() {
      return this.WellboreService.get(this.resolve.wellboreId)
      .then ((response) => {
        this.data = new this.Wellbore(response.data);
      });
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

    craeteWellboreShape() {
      this.WellboreService.createWellboreShape(this.data.wellboreShape)
        .then((response) => {
          this.data.wellboreShape = response.data;
        });
    }

    createTargetFormation() {
      this.WellboreService.createTargetFormation(this.data.targetFormation)
      .then((response) => {
        this.data.targetFormation = response.data;
      });
    }

    ok() {
      this.isSaving = true;

      this.loadingPromise = this.WellboreService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
    }

    cancel() {
      this.modalInstance.dismiss('cancel');
    }

    validatePicklists() {
      return (this.data.wellboreShape && !this.data.wellboreShape.id) || (this.data.targetFormation && !this.data.targetFormation.id);
    }
  }

  angular.module('app')
    .component('wellboresEdit', {
      templateUrl: 'views/wellbores/wellbores.edit.html',
      controller: WellboresEditController,
      bindings: {
        modalInstance: '<',
        resolve: '<',
      }
    });

})();
