;(() => {

class BasinService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
     query.expand = _.isString(query.expand) ? query.expand : this.getExpand('basins' , 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('basins', params);
  }

  get(basinId) {
    return this.RESTful.get(`basins/${basinId}`);
  }

  getByRegion(regionId) {
    return this.RESTful.get(`regions/${regionId}/basins`);
  }

  create(payload, regionId) {
    return this.RESTful.post('basins', payload)
      .then((response) => {
        this.Message.create('Basins');
        return response;
      });
  }

  update(basinId, payload, inPlace = false) {
    let promise = inPlace 
    ? this.RESTful.patch(`basins/${basinId}`, payload) 
    : this.RESTful.put('basins', payload);

    return promise.then((response) => {
      this.Message.update('Basin');
      return response;
    });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'basinsNew',
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
      component: 'basinsEdit',
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
  .service('BasinService', BasinService);

})();
