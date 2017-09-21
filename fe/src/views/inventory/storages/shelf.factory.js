angular.module('app')
  .factory('Shelf', () => {

    class Shelf extends BaseFactory {
      constructor({ id = null, name = null, rack = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, name, rack, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          rack: this.simplify(this.rack),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            rack: this.rack,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Shelf;
  });
