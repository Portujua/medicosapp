;(() => {

class PersonnelViewController {
  constructor(PersonnelService, Personnel, Auth, PromptService, TabManagerService) {
    this.PersonnelService = PersonnelService;
    this.Personnel = Personnel;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.opendate = false;
    this.data = new this.Personnel({});
    this.loadingPromise = this.load();
  }

  load() {
    this.loadingPromise = this.PersonnelService.get(this.id)
      .then((response) => {
        this.data = new this.Personnel(response.data);
      });
  }

  getPositions() {
    return this.PersonnelService.getPositions()
      .then((response) => {
        this.positions = response.data;
      });
  }

  getContractTypes() {
    return this.PersonnelService.getContractTypes(null)
      .then((response) => {

        this.contracts =response.data;
      });
  }

  getUsers() {
    return this.PersonnelService.getUsers(null, this.data.id)
      .then((response) => {
        this.users = response.data;
      });
  }


  save(data, field) {
    return this.PersonnelService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }

  getTypes() {
    this.PersonnelService.getTypes()
      .then((response) => {
        this.types = response.data;
      });
  }

  createPositionType() {
    this.PromptService.open({
      title: 'New Position Type',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Position Type',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.PersonnelService.createPosition(response);
      }, () => { });
  }

  createContractType() {
    this.PromptService.open({
      title: 'New Contract Type',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Contract Type',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.PersonnelService.createContractType(response);
      }, () => { });
  }
}

angular.module('app')
  .component('personnelView', {
    templateUrl: 'views/personnel/personnel.view.html',
    controller: PersonnelViewController,
    bindings: {
      id: '@',
      tabId: '@',
    }
  });

})();
