;(() => {

class JobsEditController {
  constructor(Auth, JobService, Job, RigService, WellService, ClientService) {
    this.session = Auth.getSession();
    this.JobService = JobService;
    this.Job = Job;
    this.RigService = RigService;
    this.WellService = WellService;
    this.ClientService = ClientService;
  }

  $onInit() {
    this.data = new this.Job({});
    this.loadingPromise = this.load(); // && this.getSomeList();
  }

  load() {
    return this.JobService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Job(response.data);
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.JobService.update(this.data.id, this.data.putPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  getWells(keyword) {
    return this.WellService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createWell() {
    this.WellService.openCreateModal()
      .then((response) => {
          this.data.well = response;
      });
  }

  updateWell() {
    this.WellService.openUpdateModal(this.data.well.id)
      .then((response) => {
        this.data.well = response;
      });
  }

  getRigs(keyword) {
    return this.RigService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createRig() {
    this.RigService.openCreateModal()
      .then((response) => {
        this.data.rig = response;
      });
  }

  updateRig() {
    this.RigService.openUpdateModal(this.data.rig.id)
      .then((response) => {
        this.data.rig = response;
      });
  }

  getClients(keyword) {
    return this.ClientService.getActives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createClient() {
    this.ClientService.openCreateModal()
      .then((response) => {
        this.data.client = response;
      });
  }

  updateClient() {
    this.ClientService.openUpdateModal(this.data.client.id)
      .then((response) => {
        this.data.client = response;
      });
  }

  getJobObjectives(keyword) {
    return this.JobService.getJobObjectives(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createJobObjective() {
    this.JobService.createJobObjective(this.data.jobObjective)
      .then((response) => {
        // Set the new value to the model
        this.data.jobObjective = response.data;
      });
  }

  getJobTypes(keyword) {
    return this.JobService.getJobTypes(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createJobType() {
    this.JobService.createJobType(this.data.jobType)
      .then((response) => {
        // Set the new value to the model
        this.data.jobType = response.data;
      });
  }

  validatePicklists() {
    return (this.data.jobObjective && !this.data.jobObjective.id) || (this.data.jobType && !this.data.jobType.id);
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('jobsEdit', {
    templateUrl: 'views/jobs/jobs.edit.html',
    controller: JobsEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
