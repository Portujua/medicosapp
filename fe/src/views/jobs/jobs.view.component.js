;(() => {

class JobsViewController {
  constructor(JobService, Job, Auth, PromptService, $rootScope, ClientService, ReportService, WellService, RigService, TabManagerService, Message, ClientContractService, ProjectService) {
    this.JobService = JobService;
    this.Job = Job;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.$rootScope = $rootScope;
    this.ClientService = ClientService;
    this.ReportService = ReportService;
    this.WellService = WellService;
    this.RigService = RigService;
    this.TabManagerService = TabManagerService;
    this.Message = Message;
    this.ClientContractService = ClientContractService;
    this.ProjectService = ProjectService;

    this.statusList = [
      { name: 'SETTING_UP', color: 'warning' },
      { name: 'UPCOMING', color: 'primary' },
      { name: 'ACTIVE', color: 'success' },
      { name: 'FINISHED', color: 'danger' },
    ];
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.JobService.get(this.id)
      .then((response) => {
        this.data = new this.Job(response.data);
      });
  }

  setStatus(status) {
    this.JobService.setStatus(this.data.id, status)
      .then((response) => {
        this.data.jobStatus = status;
      });
  }

  getWizardClass(status) {
    if (_.isEmpty(this.data)) {
      return;
    }

    let classes = '';

    if (status === this.data.jobStatus) {
      classes += 'current ';
    }

    return classes;
  }

  checkStates(status) {
    if (_.isEmpty(this.data)) {
      return;
    }

    let statusList = _.map(this.statusList, (value) => value.name);
    let posStatus = _.indexOf(statusList, status);
    let posJobStatus = _.indexOf(statusList, this.data.jobStatus);

    return posStatus < posJobStatus || posJobStatus === this.statusList.length - 1;
  }

  save(data, field) {
    return this.JobService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // this.load();
      }, (response) => {
        return '';
      });
  }

  update() {
    this.JobService.openUpdateModal(this.data.id)
      .finally(() => {
        this.load();
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

  updateClient() {
    this.ClientService.openUpdateModal(this.data.client.id)
      .then((response) => {
        this.data.client = response;
      });
  }

  getJobContracts() {
    this.ClientContractService.list({
        simple: true,
        active: true,
        expand: this.JobService.getExpand(['contract'])
      }, this.data.client.id).then((response) => {
        this.clientContracts = response.data;
      });
  }

  assign() {
    this.JobService.openAssigmentModal(this.data);
  }

  renderMap() {
    this.$rootScope.$broadcast('resizeAllMaps');
  }

  report(name) {
    switch (name) {
      case 'daily':
        this.ReportService.openDailyReport(this.data.id);
        break;
      case 'bhas':
        this.ReportService.openBhasReport(this.data.id);
        break;
      case 'timesheet':
        this.ReportService.openTimesheetReport(this.data.id)
          .then((response) => {
            if (response === 'nodata') {
              this.Message.show('there are nothing to report yet');
            }
          });
        break;
    }
  }

  createRig() {
    this.RigService.openCreateModal();
  }

  getRigs(keyword) {
    return this.RigService.getActives(keyword)
      .then((response) => {
        return _.filter(response.data, (value, key, list) => {
          return _.isEmpty(this.data.rig) ? true : this.data.rig.id !== value.id;
        });
      });
  }

  onRigChange($item, $model, $label, $event) {
    let backup = angular.copy(this.data.rig);
    this.data.rig = $item;

    this.JobService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        this.load();
      }, () => {
        // Rollback
        this.data.rig = backup;
      })
      .finally(() => {
        this.newRig = null;
        this.openRigSearch = false;
      });
  }

  createWell() {
    this.WellService.openCreateModal();
  }

  getWells(keyword) {
    return this.WellService.getActives(keyword)
      .then((response) => {
        return _.filter(response.data, (value, key, list) => {
          return _.isEmpty(this.data.well) ? true : this.data.well.id !== value.id;
        });
      });
  }

  onWellChange($item, $model, $label, $event) {
    let backup = angular.copy(this.data.well);
    this.data.well = $item;

    this.JobService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        this.load();
      }, () => {
        // Rollback
        this.data.well = backup;
      })
      .finally(() => {
        this.newWell = null;
        this.openWellSearch = false;
      })
  }

  getClients(keyword) {
    return this.ClientService.getActives(keyword)
      .then((response) => {
        return _.filter(response.data, (value, key, list) => {
          return _.isEmpty(this.data.client) ? true : this.data.client.id !== value.id;
        });
      });
  }

  onClientChange($item, $model, $label, $event) {
    let backup = angular.copy(this.data.client);
    this.data.client = $item;

    this.JobService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        this.load();
      }, () => {
        // Rollback
        this.data.client = backup;
      })
      .finally(() => {
        this.newClient = null;
        this.openClientSearch = false;
      })
  }

  getProjects() {
    return this.ProjectService.getActives(null, null, { 'client.id': this.data.client.id })
      .then((response) => {
        this.projects = response.data;
      });
  }
}

angular.module('app')
  .component('jobsView', {
    templateUrl: 'views/jobs/jobs.view.html',
    controller: JobsViewController,
    bindings: {
      id: '@',
      tabId: '@',
    }
  });

})();
