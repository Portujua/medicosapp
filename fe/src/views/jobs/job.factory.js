angular.module('app')
  .factory('Job', () => {

    class Job extends BaseFactory {
      constructor({ id = null, jobNumber = 0, jobStatus = 'SETTING_UP', rig = null, jobObjective = null,  jobType = null, well = null, client = null, estimatedStartDate = null, estimatedEndDate = null, startDate = null, endDate = null, additionalInformation = null, personnelHours = null, isActive = true,  isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date(), personnel = [], syncedBy = null, syncedAt = null, jobContract = null, storage = null, project = null }) {
        super({ id, jobNumber, jobStatus, rig, jobObjective, jobType, well, client, estimatedStartDate, estimatedEndDate,
         startDate, endDate, additionalInformation, personnelHours,  isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt, personnel, syncedBy, syncedAt, jobContract, storage, project });
      }

      postPayload() {
        return {
          jobStatus: this.jobStatus,
          rig: this.simplify(this.rig),
          jobObjective: this.simplify(this.jobObjective),
          jobType: this.simplify(this.jobType),
          well: this.simplify(this.well),
          client: this.simplify(this.client),
          estimatedStartDate: this.estimatedStartDate,
          estimatedEndDate: this.estimatedEndDate,
          startDate: this.startDate,
          endDate: this.endDate,
          additionalInformation: this.additionalInformation,
          jobContract: this.simplify(this.jobContract),
          storage: this.simplify(this.storage),
          project: this.simplify(this.project),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            jobStatus: this.jobStatus,
            rig: this.rig,
            jobObjective: this.jobObjective,
            jobType: this.jobType,
            well: this.well,
            client: this.client,
            estimatedStartDate: this.estimatedStartDate,
            estimatedEndDate: this.estimatedEndDate,
            startDate: this.startDate,
            endDate: this.endDate,
            additionalInformation: this.additionalInformation,
            jobContract: this.jobContract,
            storage: this.storage,
            project: this.project,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Job;
  });
