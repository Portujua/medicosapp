angular.module('app')
  .factory('Inventory', () => {

    class Inventory extends BaseFactory {
      constructor({ id = null, quantityAvailable = 1, quantityOnTransit = 0, catalogEntry = null, storage = null, sector = null, rack = null, shelf = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, quantityAvailable, quantityOnTransit, catalogEntry, storage, sector, rack, shelf, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          quantityAvailable: this.quantityAvailable,
          quantityOnTransit: this.quantityOnTransit,
          catalogEntry: this.simplify(this.catalogEntry),
          storage: this.simplify(this.storage),
          sector: this.simplify(this.sector),
          rack: this.simplify(this.rack),
          shelf: this.simplify(this.shelf),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            quantityAvailable: this.quantityAvailable,
            quantityOnTransit: this.quantityOnTransit,
            catalogEntry: this.simplify(this.catalogEntry),
            storage: this.simplify(this.storage),
            sector: this.simplify(this.sector),
            rack: this.simplify(this.rack),
            shelf: this.simplify(this.shelf),
          };
        }

        if (field === 'serialNumber') {
          value = !_.isEmpty(value) ? value.toUpperCase() : value;
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Inventory;
  });
