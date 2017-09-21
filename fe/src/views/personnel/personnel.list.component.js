;(() => {

class PersonnelListController {
  constructor(PersonnelService, Personnel, Auth, NgTableParams, PromptService, TabManagerService) {
    this.PersonnelService = PersonnelService;
    this.Personnel = Personnel;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };;

        return this.loadingPromise = this.PersonnelService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
             // returning list
            return response.data.content;
          })
      }
    });
  }

  create() {
    this.PersonnelService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  update(id) {
    this.PersonnelService.openUpdateModal(id)
      .then((response) => {
        this.load();
      }, () => { });
  }

  save(data, field, item) {
    let obj = new this.Personnel(item);

    return this.PersonnelService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        // roll-back value
        if (field === 'isRigOperator') {
          item.isRigOperator = !item.isRigOperator;
        }

        return '';
      });
  }

  getPositions() {
    return this.PersonnelService.getPosition()
      .then((response) => {
        this.positions = response.data;
      });
  }

  getContractTypes() {
    return this.PersonnelService.getContractType()
      .then((response) => {
        this.contracts = response.data;
      });
  }

  getUsers(item) {
    return this.PersonnelService.getUsers(null, item.id)
      .then((response) => {
        this.users = response.data;
      });
  }

  open($event, item){
    $event.preventDefault();
    $event.stopPropagation();
    this.opened[item] = !this.opened[item];
  }

 /* toggleActivation(item) {
    this.PersonnelService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }*/

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
  .component('personnelList', {
    templateUrl: 'views/personnel/personnel.list.html',
    controller: PersonnelListController,
  });

})();
