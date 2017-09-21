;(() => {

class JobsNewController {
  constructor(Auth, JobService, Job, RigService, WellService, ClientService, PromptService, TabManagerService) {
    this.session = Auth.getSession();
    this.JobService = JobService;
    this.Job = Job;
    this.RigService = RigService;
    this.WellService = WellService;
    this.ClientService = ClientService;
    this.PromptService = PromptService;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.data = new this.Job({});
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.JobService.create(this.data.postPayload())
      .then((response) => {
        console.log(response);
        this.modalInstance.close(response.data)

        this.PromptService.open({
          text: `
          <div>
            <p>The job was created successfully. Its <strong>number</strong> is:</p>
            <div class="well well-lg margin-sm-bottom">
              <h2 class="text-center hug">${response.data.jobNumber}</h2>
            </div>
            <p class="small hug-bottom">And its virtual storage name is:</p>
            <p class="hug-bottom"><strong>${response.data.jobNumber} Storage</strong></p>
          </div>
          `,
          title: 'Job Created',
          size: 'sm',
          confirmButtonText: 'Open it!',
          cancelButtonText: 'Close',
        })
          .then(() => {
            console.log(response.data);
            // Open tab
            this.TabManagerService.add({
              title: response.data.jobNumber,
              component: 'jobsView',
              id: response.data.id
            });
          });

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
  .component('jobsNew', {
    templateUrl: 'views/jobs/jobs.new.html',
    controller: JobsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
