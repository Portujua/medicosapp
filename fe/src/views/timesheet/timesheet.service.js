;(() => {

class TimeSheetService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(jobId, expand = this.getExpand('timesheet', 'list')) {
    return this.RESTful.get(`jobs/${jobId}/personnel/hours`, { expand } );
  }

  getHoursType(keyword) {
    return this.RESTful.get('hours-types' , { keyword, active: true, simple: true });
  }

  createHoursType(itemValue) {
    return this.RESTful.post('hourstype', { itemValue })
      .then((response) => {
        this.Message.create('hourstype');
        return response;
      });
  }

  create(type, payload, id) {
    let url = type === 0 ? `jobs/${id}/personnel/hour` : `jobs/${id}/personnel/${payload.personnel.id}/hour`;
    return this.RESTful.post(url, payload)
      .then((response) => {
        this.Message.create('hour entry');
        return response;
      });
  }


  chargeCoordinatorHours(payload) {
    return this.RESTful.post('personnelhours/coordinator', payload)
      .then((response) => {
        this.Message.create('hour entry');
        return response;
      });
  }

   chargeHours(payload) {
    return this.RESTful.post('personnelhours', payload)
      .then((response) => {
        this.Message.create('hour entry');
        return response;
      });
  }

  chageStatus(payload, personnelHoursId, status) {
    return this.RESTful.put(`jobs/${personnelHoursId}/coordinator/${status}`, payload)
      .then((response) => {
        this.Message.update('hour entry');
        return response;
      });
  }

  // update(id, payload, inPlace = false) {
  //   return this.RESTful.put(`casing/${id}`, payload, { inPlace })
  //     .then((response) => {
  //       this.Message.update('casing');
  //       return response;
  //     });
  // }

  updateStatus(personnelHoursId, status) {
    return this.RESTful.put(`jobs/${personnelHoursId}/coordinator/${status}`)
      .then((response) => {
        this.Message.update('hour entry');
        return response;
      });
  }

  getPersonnel(keyword) {
    return this.RESTful.get('personnel', { keyword, active: true, simple: true });
  }

  openCreateModal(job) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'timesheetNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('TimeSheetService', TimeSheetService);

})();
