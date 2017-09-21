;(() => {

class ProjectViewController {
  constructor(ProjectService, Client,  Auth,Project, PromptService,  TabManagerService,ClientService) {
    this.ProjectService = ProjectService;
    this.Client = Client;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.Project = Project
    this.TabManagerService = TabManagerService;
    this.ClientService = ClientService;
  }

  $onInit() {
    this.load();
  }

  $onChanges() {
    if (!_.isEmpty(this.client)) {
      // If the jobId isnt empty we load the job data
      this.getClients();
    }
  }

  load() {
    this.loadingPromise = this.ProjectService.get(this.id)
      .then((response) => {
        this.data = new this.Project(response.data);
      });
  }

  getClients(keyword) {
    return this.ClientService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  save(data, field) {
    return this.ProjectService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('projectsView', {
    templateUrl: 'views/projects/projects.view.html',
    controller: ProjectViewController,
    bindings: {
      id: '@',
      client: '@',
      tabId: '@',
    }
  });

})();
