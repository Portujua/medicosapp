angular.module('app')
  .factory('Profile', () => {

    class Profile extends BaseFactory {
      constructor({ id = null, name = null, email = null, username = null, password = null, isActive = false, role = {}, expirationTime = 0 }) {
        // Parent
        super({ id, name, email, username, password, isActive, role, expirationTime });
      }

      postPayload() {
        return {
          name: this.name,
          email: this.email
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            email: this.email
          };
        } else {
          // Edit In-place update
          return {
            [field]: value,
          }
        }
      }
    };

    return Profile;
  });
