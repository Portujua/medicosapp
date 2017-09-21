;(() => {

class RigsViewController {
  constructor(RigService, Rig, Auth, PromptService, TabManagerService) {
    this.RigService = RigService;
    this.Rig = Rig;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.RigService.get(this.id)
      .then((response) => {
        this.data = new this.Rig(response.data);
      });
  }

  save(data, field) {
    return this.RigService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
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
        this.load();
      }, () => { });
  }
}

angular.module('app')
  .component('rigsView', {
    templateUrl: 'views/rigs/rigs.view.html',
    controller: RigsViewController,
    bindings: {
      id: '@',
      tabId: '@',
    }
  });

})();
