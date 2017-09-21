;(() => {

class DailyCostService extends BaseService {
  constructor(RESTful, Message, $uibModal, DailyCost) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
    this.DailyCost = DailyCost;
  }

  list(query, workingdayId) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('dailyCosts', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get(`workingdays/${workingdayId}/dailycosts`, params);
  }

  getHoursType(keyword) {
    return this.RESTful.get('hourstype' , { keyword, active: true, simple: true });
  }

  create( payload, workingDayId) {
    return this.RESTful.post('dailycosts', payload)
      .then((response) => {
        this.Message.create('daily cost');
        return response;
      });
  }

  update(dailyCostID, payload, inPlace = false) {
    let promise = inPlace 
    ? this.RESTful.patch(`dailycosts/${dailyCostID}`, payload) 
    : this.RESTful.put('dailycosts', payload);

    return promise.then((response) => {
        this.Message.update('daily cost');
        return response;
      });
   }

  getDailyCost(dailyCostID, expand = this.getExpand('dailyCosts', 'view')) {
    return this.RESTful.get(`dailycosts/${dailyCostID}`, { expand });
  }

  getTerms(keyword, clientContractId) {
    return this.RESTful.get(`dailycosts/jobs/${clientContractId}`,{ keyword, active: true, simple: true });
  }

  deleteDailyCost(dailyCostID) {
    return this.RESTful.delete(`dailycosts/${dailyCostID}`)
      .then((response) => {
        this.Message.delete('client contract term');
        return response;
      });
  }

  openCreateModal(job, workingDay) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'dailycostNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job,
        workingDay : () => workingDay,

      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('DailyCostService', DailyCostService);

})();
