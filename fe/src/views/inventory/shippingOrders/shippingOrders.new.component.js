;(() => {

class ShippingOrdersNewController {
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
    this.data = new this.ShippingOrder({ fromStorage: this.resolve.storage });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ShippingOrderService.create(this.data.postPayload())
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

  getStorages(keyword, removeFromStorage = false) {
    return this.StorageSevice.listStorage({ keyword, active: true, simple: true })
      .then((response) => {
        return _.filter(response.data, (value) => removeFromStorage ? (value.id !== this.data.fromStorage.id) : value);
      });
  }

  add(item) {
    if (_.isEmpty(this.data.fromStorage)) {
      this.data.fromStorage = item.storage;
    }

    let exists = _.find(this.data.orderLines, (value) => value.lineEntry.id === item.catalogEntry.id);

    if (!_.isEmpty(exists)) {
      if (exists.quantitySent + 1 > item.quantityAvailable) {
        this.toastr.warning('Cannot add more elements. You reached the maximum available.', 'Warning');
        return;
      }
      // Increment quantity
      exists.quantitySent++;
    } else {
      this.data.orderLines.push(new this.ShippingOrderLine({
        lineEntry: item.catalogEntry,
        max: item.quantityAvailable,
      }));
    }
  }

  remove(item, index) {
    this.data.orderLines.splice(index, 1);
  }

  getTotal() {
    return _.reduce(this.data.orderLines, (memo, value) => {
      return memo + value.quantitySent;
    }, 0);
  }
}

angular.module('app')
  .component('shippingOrdersNew', {
    templateUrl: 'views/inventory/shippingOrders/shippingOrders.new.html',
    controller: ShippingOrdersNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
