;(() => {

class RigsListController {
  constructor(RigService, Rig, Auth, NgTableParams, PromptService, TabManagerService) {
    this.RigService = RigService;
    this.Rig = Rig;
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
        };

        return this.loadingPromise = this.RigService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  create() {
    this.RigService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  update(id) {
    this.RigService.openUpdateModal(id)
      .then((response) => {
        this.load();
      }, () => { });
  }

  save(data, field, item) {
    let obj = new this.Rig(item);

    return this.RigService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  getTypes() {
    this.RigService.getTypes()
      .then((response) => {
        this.types = response.data;
      });
  }

  createType() {
    this.PromptService.open({
      title: 'New Rig Type',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Rig Type',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.RigService.createType(response);
      }, () => { });
  }
}

angular.module('app')
  .component('rigsList', {
    templateUrl: 'views/rigs/rigs.list.html',
    controller: RigsListController,
  });

})();
