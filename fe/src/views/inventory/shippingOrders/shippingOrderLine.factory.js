angular.module('app')
  .factory('ShippingOrderLine', () => {

    class ShippingOrderLine extends BaseFactory {
      constructor({ id = null, lineEntry = null, quantitySent = 1, quantityReceived = 0, order = null, max = 0, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, lineEntry, quantitySent, quantityReceived, order, max, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          id: this.id,
          lineEntry: this.simplify(this.lineEntry),
          quantitySent: this.quantitySent,
          order: this.simplify(this.order),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            lineEntry: this.simplify(this.lineEntry),
            quantitySent: this.quantitySent,
            order: this.simplify(this.order),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return ShippingOrderLine;
  });
