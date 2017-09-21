angular.module('app')
  .factory('BhaComponentInventory', () => {

    class BhaComponentInventory extends BaseFactory {
      constructor({ id = null, order = 0, bha = null, catalogEntry = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, order, bha, catalogEntry, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          order: this.order,
          bha: this.simplify(this.bha),
          catalogEntry: this.simplify(this.catalogEntry),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            order: this.order,
            bha: this.simplify(this.bha),
            catalogEntry: this.simplify(this.catalogEntry),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return BhaComponentInventory;
  });
