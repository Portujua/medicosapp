;(() => {

class ShippingOrderLinesListController {
  constructor(Auth, NgTableParams, ShippingOrderService, ShippingOrderLine) {
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.ShippingOrderService = ShippingOrderService;
    this.ShippingOrderLine = ShippingOrderLine;
    this.typesArray = [
      { id: 'BHACOMPONENT', title: 'BHA Component' },
      { id: 'BIT', title: 'Drill Bit' },
      { id: 'MOTOR', title: 'Motor' },
      { id: 'WATERPUMP', title: 'Water Pump' },
    ];
  }

  $onChanges() {
    if (!_.isEmpty(this.shippingOrder)) {
      this.load();
    }
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

        return this.loadingPromise = this.ShippingOrderService.listLines(query, this.id)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list
            return this.data = response.data.content;
          });
      }
    });
  }

  create() {
    this.ShippingOrderService.openAddModal(this.shippingOrder, this.data)
      .then((response) => {
        this.load();
      }, () => { });
  }

  delete(id) {
    this.isDeleting = true;

    this.loadingPromise = this.ShippingOrderService.deleteLine(id)
      .then((response) => {
        this.load();
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

  save(data, field, item) {
    let obj = new this.ShippingOrderLine(item);

    return this.ShippingOrderService.updateLine(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }
}

angular.module('app')
  .component('shippingOrderLinesList', {
    templateUrl: 'views/inventory/shippingOrders/shippingOrderLines.list.html',
    controller: ShippingOrderLinesListController,
    bindings: {
      id: '@',
      shippingOrder: '<?'
    }
  });

})();
