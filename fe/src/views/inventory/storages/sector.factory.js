angular.module('app')
  .factory('Sector', () => {

    class Sector extends BaseFactory {
      constructor({ id = null, name = null, storage = null, racks = [], isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, name, storage, racks, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          storage: this.simplify(this.storage),
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

    return Sector;
  });
