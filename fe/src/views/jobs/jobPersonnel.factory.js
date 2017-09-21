angular.module('app')
  .factory('JobPersonnel', () => {

    class JobPersonnel extends BaseFactory {
      constructor({ id = null, personnel = null, position = 'DRILLER' }) {
        super({ id, personnel, position });
      }

      postPayload() {
        return {
          personnel: this.personnel,
          position: this.position,
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

    return JobPersonnel;
  });
