;(() => {

class ShippingOrderService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('shippingOrders', 'list', 'inventory/shippingOrders');
    let params = this.getQueryString(query);

    return this.RESTful.get('shipping-orders', params);
  }

  get(id, expand = this.getExpand('shippingOrders', 'view', 'inventory/shippingOrders')) {
    return this.RESTful.get(`shipping-orders/${id}`, { expand });
  }

  delete(id) {
    return this.RESTful.delete(`shipping-orders/${id}`);
  }

  create(payload) {
    return this.RESTful.post('shipping-orders', payload)
      .then((response) => {
        this.Message.create('shipping order');
        return response;
      });
  }

  complete(payload) {
    return this.RESTful.put('shipping-orders', payload, { complete: true })
      .then((response) => {
        this.Message.show('The Shipping Order was completed.');
        return response;
      });
  }

  listLines(query, id) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('shippingOrderLines', 'list', 'inventory/shippingOrders');
    let params = this.getQueryString(query);

    return this.RESTful.get(`shipping-orders/${id}/lines`, params);
  }

  createLine(payload) {
    // UPSERT
    if (!_.isEmpty(payload.id)) {
      return this.updateLine(payload.id, payload);
    }

    return this.RESTful.post('shipping-orders/lines', payload)
      .then((response) => {
        this.Message.create('line');
        return response;
      });
  }

  updateLine(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`shipping-orders/lines/${id}`, payload)
      : this.RESTful.put('shipping-orders/lines', payload);

    return promise.then((response) => {
      this.Message.update('line');
      return response;
    });
  }

  deleteLine(id) {
    return this.RESTful.delete(`shipping-orders/lines/${id}`);
  }

  openCreateModal(storage) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'shippingOrdersNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: {
        storage: () => storage,
      }
    });

    return modalInstance.result;
  }

  openAddModal(shippingOrder, list = []) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'shippingOrderLinesNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'full',
      resolve: {
        shippingOrder: () => shippingOrder,
        list: () => list,
      }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('ShippingOrderService', ShippingOrderService);

})();
