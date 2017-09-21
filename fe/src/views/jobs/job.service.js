;(() => {

class JobService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('jobs', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('jobs', params);
  }

  autocomplete(word) {
    return this.RESTful.get('api/search/autocomplete', { keyword: word })
  }

  search(filters) {
    let params = '';

    for (let i = 0; i < filters.length; i++) {
      if (i > 0) {
        params += '&'
      }
      params += `${filters[i].path}=${filters[i].value}`
    }

    return this.RESTful.get(`search/job?${params}`);
  }

  get(id, expand = this.getExpand('jobs', 'view')) {
    return this.RESTful.get(`jobs/${id}`, { expand });
  }

  create(payload) {
    return this.RESTful.post('jobs', payload)
      .then((response) => {
        this.Message.create('job');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`jobs/${id}`, payload)
      : this.RESTful.put('jobs', payload);

    return promise.then((response) => {
        this.Message.update('job');
        return response;
      });
  }

  setStatus(id, status = 'ACTIVE') {
    return this.RESTful.put(`jobs/${id}/${status}`)
      .then((response) => {
        this.Message.update('job status');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`jobs/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  createJobType(itemValue) {
    return this.RESTful.post('jobs/types', { itemValue })
      .then((response) => {
        this.Message.create('job type');
        return response;
      });
  }

  getJobTypes(keyword) {
    return this.RESTful.get('jobs/types', { keyword, active: true, simple: true });
  }

  createJobObjective(itemValue) {
    return this.RESTful.post('objectives', { itemValue })
      .then((response) => {
        this.Message.create('job objective');
        return response;
      });
  }

  getJobObjectives(keyword) {
    return this.RESTful.get('objectives', { keyword, active: true, simple: true });
  }

  openCreateModal() {
    // let modalInstance = this.$uibModal.open({
    //   ariaLabelledBy: 'modal-title',
    //   ariaDescribedBy: 'modal-body',
    //   component: 'jobsNew',
    //   keyboard: true,
    //   // Indicates whether the dialog should be closable by hitting the ESC key.
    //   backdrop: 'static',
    //   // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
    //   size: 'lg',
    //   resolve: { }
    // });

    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'jobsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: false,
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose',
      resolve: { }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'jobsEdit',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'lg',
      resolve: {
        id: () => id,
      }
    });

    return modalInstance.result;
  }

  assign(id, payload) {
    payload.job = {
      id: id
    }

    return this.RESTful.post('jobs/personnel', payload)
      .then((response) => {
        this.Message.create('assignment');
        return response;
      });
  }

  removeAssignment(jobId, personnelId) {
    return this.RESTful.delete(`rig/${jobId}/driller/${personnelId}`)
      .then((response) => {
        this.Message.delete('assignment');
        return response;
      });
  }

  getAssignedPersonnel(id, expand = this.getExpand(['personnel', 'personnel.user'])) {
    return this.RESTful.get(`jobs/${id}/personnel`, { expand });
  }

  getUnassignedPersonnel(id, keyword, position = 'DRILLER') {
    return this.RESTful.get(`jobs/${id}/personnel/${position}`, { keyword, simple: true, expand: '.user' });
  }

  getJobPositions() {
    return this.RESTful.get('job-positions');
  }

  openAssigmentModal(job) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'jobsAssignment',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        job: () => job,
      }
    });

    return modalInstance.result;
  }

  getNavbarButton() {
    return {
      id: 'create.job',
      name: 'New Job',
      type: 'create',
      module: 'job',
      permission: 'create',
      icon: 'fa-cogs',
      color: 'color-1',
      order: 0,
      callback: () => { this.openCreateModal() }
    };
  }

  getSidebarButton() {
    return {
      title: 'Jobs',
      order: 0,
      icon: 'fa-cogs',
      tab: {
        component: 'jobsList',
      },
      color: 'color-1',
    };
  }

  dailyDepth(jobId) {
    return this.RESTful.get(`jobs/${jobId}/chart/daily-depth`)
  }

  dailyCosts(jobId) {
    return this.RESTful.get(`jobs/${jobId}/chart/daily-costs`)
  }
};

angular.module('app')
  .service('JobService', JobService);

})();
