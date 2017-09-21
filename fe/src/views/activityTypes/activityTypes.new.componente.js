;(() => {

class ActivityTypesNewController {
  constructor(ActivityTypeService, ActivityType) {
    this.ActivityTypeService = ActivityTypeService;
    this.ActivityType = ActivityType;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new this.ActivityType({});

  }

  save() {
    this.isSaving = true;

    this.loadingPromise = this.ActivityTypeService.create(this.data.postPayload())
      .then((response) => {
        this.modalInstance.close(response.data);
      }).finally(function() {
        this.isSaving = false;
      });
  }

  cancel(){
    this.modalInstance.dismiss('cancel');
  }


}

angular.module('app')
  .component('activityTypesNew', {
    templateUrl: 'views/activityTypes/activityTypes.new.html',
    controller: ActivityTypesNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
