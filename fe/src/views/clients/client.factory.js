angular.module('app')
  .factory('Client', () => {

    class Client extends BaseFactory {
      constructor({ id = null, name = null, emails = [], phones = [] , profilePicturePath = null , profilePicture = null, projects=null }) {
        super({ id, name, emails, phones, profilePicturePath , profilePicture , projects });
      }

      postPayload() {
        return {
          name: this.name,
          emails: this.emails,
          phones: this.phones,
          profilePicture: this.profilePicture
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            emails: this.emails,
            phones: this.phones
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Client;
  });
