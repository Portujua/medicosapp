;(() => {

class ShippingOrdersListController {
  constructor(Auth, NgTableParams, PromptService, ShippingOrderService, ShippingOrder) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    this.ShippingOrderService = ShippingOrderService;
    this.ShippingOrder = ShippingOrder;

  }

  $onInit() {
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.ShippingOrderService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return response.data.content;
          });
      }
    });
  }

  create() {
    this.ShippingOrderService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  delete(id) {
    this.isDeleting = true;

    this.loadingPromise = this.ShippingOrderService.delete(id)
      .then((response) => {
        this.load();
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

  save(data, field, item) {
    let obj = new this.ShippingOrder(item);

    return this.ShippingOrderService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {
        console.log(response);
      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.ShippingOrderService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }
}

angular.module('app')
  .component('shippingOrdersList', {
    templateUrl: 'views/inventory/shippingOrders/shippingOrders.list.html',
    controller: ShippingOrdersListController,
    bindings: {

    }
  });

})();
