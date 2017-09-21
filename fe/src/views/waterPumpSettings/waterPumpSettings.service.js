;(() => {

class WaterPumpSettingsService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query, jobId) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('waterPumpSettings', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('waterpump-settings', params);
  }

  create( payload, jobId) {
    return this.RESTful.post('waterpump-settings', payload)
      .then((response) => {
        this.Message.create('Water Pump Settings');
        return response;
      });
  }

  update(waterPumpSettingId, payload, inPlace = false) {
    let promise = inPlace 
    ? this.RESTful.patch(`waterpump-settings/${waterPumpSettingId}`, payload) 
    : this.RESTful.put('waterpump-settings', payload);

    return promise.then((response) => {
      this.Message.update('Water Pump Settings');
      return response;
    });
 
   }




  openCreateModal(job) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'waterpumpsettingsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        job: () => job

      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('WaterPumpSettingsService', WaterPumpSettingsService);

})();
