angular.module('app')
  .factory('Well', () => {

    class Well extends BaseFactory {
      constructor({ id = null, name = null, legalName = null, owner = null, latitude = 0, longitude = 0, isOffshore = false, productionType = null, basin = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, name, legalName, owner, latitude, longitude, isOffshore, productionType, basin, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          legalName: this.legalName,
          basin: this.basin,
          owner: this.owner,
          latitude: this.latitude,
          longitude: this.longitude,
          isOffshore: this.isOffshore,
          productionType: this.productionType,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            legalName: this.legalName,
            owner: this.owner,
            basin: this.basin,
            latitude: this.latitude,
            longitude: this.longitude,
            isOffshore: this.isOffshore,
            productionType: this.productionType,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Well;
  });
