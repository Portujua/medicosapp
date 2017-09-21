;(() => {

class ShippingOrderLinesNewController {
  constructor(Auth, ShippingOrderService, ShippingOrder, ShippingOrderLine, StorageSevice, toastr) {
    this.session = Auth.getSession();
    this.ShippingOrderService = ShippingOrderService;
    this.ShippingOrder = ShippingOrder;
    this.ShippingOrderLine = ShippingOrderLine;
    this.StorageSevice = StorageSevice;
    this.toastr = toastr;

  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new this.ShippingOrderLine({ order: this.resolve.shippingOrder });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ShippingOrderService.createLine(this.data.postPayload())
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }

  add(item) {
    // Setting max value
    this.data.max = item.quantityAvailable;

    let exists = _.find(this.resolve.list, (value) => value.lineEntry.id === item.catalogEntry.id);

    if (_.isEmpty(exists)) {
      this.data.id = null;
      this.data.lineEntry = item.catalogEntry;
      this.data.quantitySent = 1;
    } else {
      this.data.id = exists.id;
      this.data.lineEntry = exists.lineEntry;
      this.data.quantitySent = exists.quantitySent;
    }
  }
}

angular.module('app')
  .component('shippingOrderLinesNew', {
    templateUrl: 'views/inventory/shippingOrders/shippingOrderLines.new.html',
    controller: ShippingOrderLinesNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
