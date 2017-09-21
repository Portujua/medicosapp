;(() => {

class PersonnelNewController {
  constructor(PersonnelService, Personnel, Auth) {
    this.PersonnelService = PersonnelService;
    this.Personnel = Personnel;
    this.session = Auth.getSession();

  }

  $onInit() {
    this.data = new this.Personnel({});
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
    return this.PersonnelService.getUsers(keyword)
      .then((response) => {
        return response.data;
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.PersonnelService.create(this.data.postPayload())
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
  .component('personnelNew', {
    templateUrl: 'views/personnel/personnel.new.html',
    controller: PersonnelNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
