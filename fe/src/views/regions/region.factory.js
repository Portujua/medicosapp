angular.module('app')
  .factory('Region', () => {

    class Region extends BaseFactory {
      constructor({ id = null, name = null, type = null, parent = null, children = null }) {
        super({ id, name, type, parent, children });
      }

      postPayload() {
        return {
          name: this.name
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name
          };
        } else {
          // Edit In-place update
          return {
            [field]: value,
          }
        }
      }
    };

    return Region;
  });
