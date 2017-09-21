;(() => {

class InventoryService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('inventory', 'list');
    let params = this.getQueryString(query);

    return this.RESTful.get('inventory-entries', params);
  }

  create(payload) {
    return this.RESTful.post('inventory-entries', payload)
      .then((response) => {
        this.Message.create('inventory entry');
        return response;
      });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`inventory-entries/${id}`, payload)
      : this.RESTful.put('inventory-entries', payload);

    return promise.then((response) => {
        this.Message.update('inventory entry');
        return response;
      });
  }

  openCreateModal(catalogEntry, storage) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'inventoryNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: {
        catalogEntry: () => catalogEntry,
        storage: () => storage,
      }
    });

    return modalInstance.result;
  }

  getNavbarButton() {
    return {
      id: 'create.inventory',
      name: 'New Inventory Entry',
      type: 'create',
      module: 'inventory',
      permission: 'create',
      icon: 'fa-wrench',
      color: 'color-7',
      callback: () => { this.openCreateModal(); }
    }
  }

  getSidebarButton() {
    return {
      title: 'Inventory',
      icon: 'fa-wrench',
      color: 'color-7',
      tab: {
        id: 'inventoryContainer',
        title: 'Inventory',
        component: 'inventoryContainer',
        color: 'color-7',
      },
    };
  }
};

angular.module('app')
  .service('InventoryService', InventoryService);

})();
