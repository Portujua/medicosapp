;(() => {

class MudNewController {
  constructor(MudService, Mud, Auth) {
    this.MudService = MudService;
    this.Mud = Mud;
    this.session = Auth.getSession();

  }

  $onInit() {
    this.data = new this.Mud({ 
      checkedAt: new Date(this.resolve.date),
      job: {
        id: this.resolve.jobId
      }
    });
  }

  getMudTypes(keyword) {
    return this.MudService.getMudTypes(keyword)
      .then((response) => {
      
        return response.data;
      });
  }

  createMudType() {
    this.MudService.createMudType(this.data.mudType)
      .then((response) => {
        // Set the new value to the model
        this.data.mudType = response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.data.checkedAt.setHours(this.hour.getHours(), this.hour.getMinutes());

    this.loadingPromise = this.MudService.create(this.data.postPayload())
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

  open() {
    this.opendate = true;
  }
}

angular.module('app')
  .component('mudsNew', {
    templateUrl: 'views/muds/muds.new.html',
    controller: MudNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
