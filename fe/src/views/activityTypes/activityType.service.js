;(() => {

class ActivityTypeService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    let params = this.getQueryString(query);

    return this.RESTful.get('activities/types', params);
  }

  create(payload) {
    return this.RESTful.post('activities/types', payload)
      .then((response) => {
        this.Message.create('activity type');
        return response;
      });
  }


  get(id) {
    return this.RESTful.get(`activity/type/${id}`);
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
    ? this.RESTful.patch(`activities/types/${id}`, payload) 
    : this.RESTful.put('activities/activities', payload);

    return promise.then((response) => {
        this.Message.update('activity type');
        return response;
      });
  }

  toggleActivation(id, status) {
    this.RESTful.patch(`activities/types/${id}`, { isActive: status })
    .then((response) => {
      this.Message.toggle();
      return response;
    });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'activityTypesNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: { }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'activityTypesEdit',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        id: () => id,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('ActivityTypeService', ActivityTypeService);

})();
