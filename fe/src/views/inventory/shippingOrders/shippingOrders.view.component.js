;(() => {

class ShippingOrdersViewController {
  constructor(ShippingOrderService, ShippingOrder, Auth, TabManagerService, PromptService) {
    this.ShippingOrderService = ShippingOrderService;
    this.ShippingOrder = ShippingOrder;
    this.session = Auth.getSession();
    this.TabManagerService = TabManagerService;
    this.PromptService = PromptService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.ShippingOrderService.get(this.id)
      .then((response) => {
        this.data = new this.ShippingOrder(response.data);
      });
  }

  save(data, field) {
    return this.ShippingOrderService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }

  complete() {
    this.PromptService.open({
      text: `Do you want to complete the shipping order number <b>${this.data.shippingOrderNumber}</b>?`,
      title: 'Complete Order',
      confirmButtonText: 'Complete',
      cancelButtonText: 'No',
      size: 'sm',
    })
    .then((response) => {
      let payload = this.data.putPayload();
      payload.isComplete = true;

      this.ShippingOrderService.complete(payload)
        .then((response) => {
          this.load();
        });
    });
  }
}

angular.module('app')
  .component('shippingOrdersView', {
    templateUrl: 'views/inventory/shippingOrders/shippingOrders.view.html',
    controller: ShippingOrdersViewController,
    bindings: {
      id: '@',
      job: '<',
      tabId: '@',
    }
  });

})();
