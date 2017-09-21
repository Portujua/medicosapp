angular.module('app')
  .factory('ShippingOrder', () => {

    class ShippingOrder extends BaseFactory {
      constructor({ id = null, shippingOrderNumber = null, fromStorage = null, toStorage = null, isComplete = false, orderLines = [], isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, shippingOrderNumber, fromStorage, toStorage, isComplete, orderLines, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          fromStorage: this.simplify(this.fromStorage),
          toStorage: this.simplify(this.toStorage),
          isComplete: this.isComplete,
          orderLines: _.map(this.orderLines, (value) => value.postPayload()),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            shippingOrderNumber: this.shippingOrderNumber,
            fromStorage: this.simplify(this.fromStorage),
            toStorage: this.simplify(this.toStorage),
            isComplete: this.isComplete,
            orderLines: _.map(this.orderLines, (value) => value.putPayload()),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return ShippingOrder;
  });
