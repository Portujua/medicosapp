angular.module('app')
  .factory('Basin', () => {

    class Basin extends BaseFactory {
      constructor({ id = null, name = null, description = null, region = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        super({ id, name, description, region, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          description: this.description,
          region: this.region,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            description: this.description,
            region: this.region,
          };
        } else {
          // Edit In-place update
          return {
            [field]: value,
          }
        }
      }
    }

    return Basin;
  });
