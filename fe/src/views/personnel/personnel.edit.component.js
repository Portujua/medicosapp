;(() => {

class PersonnelEditController {
  constructor(PersonnelService, Personnel, Auth) {
    this.PersonnelService = PersonnelService;
    this.Personnel = Personnel;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.opendate = false;
    this.data = new this.Personnel({});
    this.loadingPromise = this.load();
  }

  load() {
    return this.PersonnelService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Personnel(response.data);
    });
  }

  getPositions(keyword) {
    return this.PersonnelService.getPositions(keyword)
      .then((response) => {
        return response.data;
      });
  }

  getContractTypes(keyword) {
    return this.PersonnelService.getContractTypes(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createPosition() {
    this.PersonnelService.createPosition(this.data.positionType)
      .then((response) => {
        // Set the new value to the model
        this.data.positionType = response.data;
      });
  }

  createContract() {
    this.PersonnelService.createContractType(this.data.contractType)
      .then((response) => {
        // Set the new value to the model
        this.data.contractType = response.data;
      });
  }

  getUsers(keyword) {
    return this.PersonnelService.getUsers(keyword, this.data.id)
      .then((response) => {
        return response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.PersonnelService.update(this.data.id, this.data.putPayload())
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
  .component('personnelEdit', {
    templateUrl: 'views/personnel/personnel.edit.html',
    controller: PersonnelEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
