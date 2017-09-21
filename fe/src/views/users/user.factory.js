angular.module('app')
  .factory('User', () => {

    class User extends BaseFactory {
      constructor({ id = null, name = null, email = null, username = null, password = null, profilePicturePath= null, profilePicture = null,  isActive = false, role = {}, expirationTime = 0 }) {
        // Parent
        super({ id, name, email, username, password, isActive, role, expirationTime , profilePicturePath, profilePicture });
      }

      postPayload() {
        return {
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
          role: this.role,
          profilePicture: this.profilePicture
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role,
          };
        }

        return {
          [field]: value,
        };
      }
    };

    return User;
  });
