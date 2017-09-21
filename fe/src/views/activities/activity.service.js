;(() => {

class ActivityService  extends BaseService  {
  constructor(Message, $uibModal, Activity, RESTful,) {
    super();
    this.Message = Message;
    this.$uibModal = $uibModal;
    this.Activity = Activity;
    this.RESTful = RESTful;
  }

  list(query, dayId) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('activities', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get(`workingdays/${dayId}/activities`, params);
  }


  create(payload, dayId) {
    return this.RESTful.post('activities', payload)
      .then((response) => {
        this.Message.create('activities');

        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`activities/${id}`, payload)
      : this.RESTful.put('activities', payload);

    return promise.then((response) => {
      this.Message.update('activity');
      return response;
    });
   }

  get(id) {
    return this.RESTful.get(`activities/${id}`);
  }

  getformations(keyword, wellboreId) {
    return this.RESTful.get(`wellbore/${wellboreId}/formationrecord`, { keyword, simple: true, active: true });
  }

  getBHA(keyword, jobId) {
    return this.RESTful.get(`job/${jobId}/bha`, { keyword, simple: true, active: true });
  }


  openCreateModal(job, workingDay, list) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'activitiesNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      // backdrop: 'static',
      backdrop: false,
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
        workingDay: () => workingDay,
        list: () => list,
      }
    });

    return modalInstance.result;
  }



};

angular.module('app')
  .service('ActivityService', ActivityService);

})();
