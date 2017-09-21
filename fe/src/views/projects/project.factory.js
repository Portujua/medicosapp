angular.module('app')
  .factory('Project', () => {

    class Project extends BaseFactory {
      constructor({ id = null, name = null, description = null, profilePicture = null ,  profilePicturePath = null, isActive = false,isDeleted = false,  client= null , jobs= null,
        createdBy = null, createdAt = new Date(), updateBy = null, updatedAt = new Date() }) {
        super({ id, name, description,  profilePicture, profilePicturePath, isActive,isDeleted,client,jobs, createdBy, createdAt,updateBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          description: this.description,          
          client: this.client,

        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            description: this.description,          
            client: this.client,
            profilePicture: this.profilePicture
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Project;
  });
