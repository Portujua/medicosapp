;(() => {

class WellsViewController {
  constructor(WellService, Well, Auth, PromptService, NumericUtil, TabManagerService) {
    this.WellService = WellService;
    this.Well = Well;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.NumericUtil = NumericUtil;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.WellService.get(this.id)
      .then((response) => {
        this.data = new this.Well(response.data);
      });
  }

  save(data, field) {
    return this.WellService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }

  getTypes() {
    this.WellService.getTypes()
      .then((response) => {
        this.types = response.data;
      });
  }

  createProductionType() {
    this.PromptService.open({
      title: 'New Production Type',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Production Type',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.WellService.createProductionType(response);
      }, () => { });
  }
}

angular.module('app')
  .component('wellsView', {
    templateUrl: 'views/wells/wells.view.html',
    controller: WellsViewController,
    bindings: {
      id: '@',
      job: '<',
      tabId: '@',
    }
  });

})();
