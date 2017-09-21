;(() => {

class JobsController {
  constructor(Auth, NgTableParams, PromptService, JobService, Job, RigService, WellService, ClientService, TabManagerService) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.JobService = JobService;
    this.Job = Job;
    this.RigService = RigService;
    this.WellService = WellService;
    this.ClientService = ClientService;
    this.TabManagerService = TabManagerService;
    this.statusArray = [
      { id: 'SETTING_UP', title: 'Setting up' },
      { id: 'UPCOMING', title: 'Upcoming' },
      { id: 'ACTIVE', title: 'Active' },
      { id: 'FINISHED', title: 'Finished' },
      { id: 'CANCELED', title: 'Canceled' },
    ];
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
          filter: params.filter()
        };

        return this.loadingPromise = this.JobService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  autocomplete(query) {
    return this.JobService.autocomplete(query);
  }

  search(filters) {
    if (filters.length === 0) {
      this.load();
      return;
    }

    return this.JobService.search(filters)
      .then((response) => {
        this.tableParams = new this.NgTableParams({ }, {
          dataset: response.data.content
        })
      })
  }

  create() {
    this.JobService.openCreateModal()
      .then((response) => {
        // Reload list
        this.load();
      }, () => { });
  }

  update(id) {
    this.JobService.openUpdateModal(id)
      .finally(() => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Job(item);

    return this.JobService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.JobService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }

  assign(id) {
    this.JobService.openAssigmentModal(id)
      .then((response) => {
        // this.load();
      }, () => { });
  }

  getRigs() {
    this.RigService.getActives()
      .then((response) => {
        this.rigs = response.data;
      });
  }

  getWells() {
    this.WellService.getActives()
      .then((response) => {
        this.wells = response.data;
      });
  }

  getClients() {
    this.ClientService.getActives()
      .then((response) => {
        this.clients = response.data;
      });
  }

  getJobObjectives() {
    this.JobService.getJobObjectives()
      .then((response) => {
        this.jobObjectives = response.data;
      });
  }

  createJobObjective() {
    this.PromptService.open({
      title: 'New Job Objective',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Job Objective',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.JobService.createJobObjective(response);
      }, () => { });
  }

  getJobTypes() {
    this.JobService.getJobTypes()
      .then((response) => {
        this.jobTypes = response.data;
      });
  }

  createJobType() {
    this.PromptService.open({
      title: 'New Job Type',
      confirmButtonText: 'Create',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          label: 'Job Type',
          placeholder: 'Enter a value...',
          maxlength: 50,
        }
      ]
    })
      .then((response) => {
        this.JobService.createJobType(response);
      }, () => { });
  }
}

angular.module('app')
  .component('jobsList', {
    templateUrl: 'views/jobs/jobs.list.html',
    controller: JobsController,
    bindings: {
      tabId: '@',
    }
  });

})();
