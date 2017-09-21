;(() => {

class ProjectsNewController {
  constructor(Auth, ProjectService, Project, ClientService) {
    this.session = Auth.getSession();
    this.ProjectService = ProjectService;
    this.Project = Project;
    this.ClientService = ClientService;
  }

  $onInit() {
   this.data = new this.Project({ client: this.resolve.client });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ProjectService.create(this.data.postPayload())
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

  getClients(keyword) {
    return this.ClientService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  validatePicklists() {
    return (this.data.client && !this.data.client.id);
  }
}

angular.module('app')
  .component('projectsNew', {
    templateUrl: 'views/projects/projects.new.html',
    controller: ProjectsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
