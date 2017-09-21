;(() => {

class ProjectService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('projects', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('projects', params);
  }

  listByClient(query, client) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`clients/${client.id}/projects`, params);
  }

  get(id, expand = this.getExpand('projects', 'view')) {
    return this.RESTful.get(`projects/${id}`, { expand });
  }

  create(payload) {
    return this.RESTful.post('projects', payload)
      .then((response) => {
        this.Message.create('projects');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace 
      ? this.RESTful.patch(`projects/${id}`, payload) 
      : this.RESTful.put('projects', payload);

    return promise.then((response) => {
        this.Message.update('projects');
        return response;
      });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'projectsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: { }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'clientsEdit',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        id: () => id,
      }
    });

    return modalInstance.result;
  }

  getNavbarButton() {
    return {
      id: 'create.projects',
      name: 'New Project',
      type: 'create',
      module: 'client',
      permission: 'create',
      icon: 'fa-folder-open-o',
      color: 'color-8',
      callback: () => { this.openCreateModal(); }
    }
  }

  getSidebarButton() {
    return {
      title: 'Projects',
      icon: 'fa-folder-open-o',
      color: 'color-8',
      tab: {
        component: 'projectsList',
      }
    };
  }
};

angular.module('app')
  .service('ProjectService', ProjectService);

})();
