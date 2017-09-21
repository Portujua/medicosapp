;(() => {

class ActivityTypesEditController {
  constructor(ActivityTypeService, ActivityType, Auth) {
    this.ActivityTypeService = ActivityTypeService;
    this.ActivityType = ActivityType;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.ActivityType({});
    this.loadingPromise = this.load();
  }

  load() {
    return this.ActivityTypeService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.ActivityType(response.data);
      });
  }


  toggleActivation() {
    this.ActivityTypeService.toggleActivation(this.data.id, this.data.isActive)
      .then((response) => {

      }, (response) => {
        this.data.isActive = !this.data.isActive;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ActivityTypeService.update(this.data.id, this.data.putPayload())
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
  .component('activityTypesEdit', {
    templateUrl: 'views/activityTypes/activityTypes.edit.html',
    controller: ActivityTypesEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
