angular.module('app')
  .factory('Rack', () => {

    class Rack extends BaseFactory {
      constructor({ id = null, name = null, sector = null, shelves = [], isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, name, sector, shelves, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          sector: this.simplify(this.sector),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {

          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Rack;
  });
