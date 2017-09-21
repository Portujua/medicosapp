;(() => {

class ProjectsListController {
  constructor(ProjectService, Project, Auth, NgTableParams) {
    this.ProjectService = ProjectService;
    this.Project = Project;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.filter = {};
  }

  $onInit() {
    this.load();
  }

  $onChanges() {
    if (!_.isEmpty(this.client)) {
      // Filter by client.id
      this.filter = { clientId: this.client.id };
      this.load();
    }
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
          filter: params.filter()
        };

        let promise = _.isObject(this.client)
          ? this.ProjectService.listByClient(query, this.client)
          : this.ProjectService.list(query);

        return this.loadingPromise = promise.then((response) => {
          // Setting the total of records
          params.total(response.data.totalElements);
          // returning list
          return response.data.content;
        });
      }
    });
  }

  create() {
    this.ProjectService.openCreateModal()
      .then((response) => {
         this.load();
      }, () => { });
  }

  update(id) {
    this.ProjectService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Client(item);

    return this.ProjectService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('projectsList', {
    templateUrl: 'views/projects/projects.list.html',
    controller: ProjectsListController,
    bindings: {
       client: '<?',
    }
  });

})();
