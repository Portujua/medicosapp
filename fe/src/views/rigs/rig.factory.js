angular.module('app')
  .factory('Rig', () => {

    class Rig extends BaseFactory {
      constructor({ id = null, name = null, owner = null, manufacturer = null, comments = null, power = null, type = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        super({ id, name, owner, manufacturer, comments, power, type, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          owner: this.owner,
          manufacturer: this.manufacturer,
          comments: this.comments,
          power: this.power,
          type: this.type,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            owner: this.owner,
            manufacturer: this.manufacturer,
            comments: this.comments,
            power: this.power,
            type: this.type,
          };
        } else {
          // Edit In-place update
          return {
            [field]: value,
          }
        }
      }
    }

    return Rig;
  });
