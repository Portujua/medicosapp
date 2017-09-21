angular.module('app')
  .factory('Storage', () => {

    class Storage extends BaseFactory {
      constructor({ id = null, name = null, description = null, address = null, sectors = [], entries = [], isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, name, description, address, sectors, entries, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          description: this.description,
          address: this.address,
          sectors: this.sectors,
          entries: this.entries,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            description: this.description,
            address: this.address,
            sectors: this.sectors,
            entries: this.entries,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Storage;
  });
