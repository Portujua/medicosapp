 angular.module('app')
  .factory('Role', () => {

    class Role extends BaseFactory {
      constructor({ id = null, name = null, description = null, permission = [], isActive = false, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        super({ id, name, description, permission, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          role: {
            name: this.name,
            description: this.description,
          },
          permissionList: _.reduce(this.permission, (memo, entity) => {
            // Just active actions
            let activeActions = _.filter(entity.sysAction, (action) => {
              return action.activeForRole;
            });

            // Push all permissionIds
            _.each(activeActions, (action) => {
              memo.push(action.permissionId)
            });

            return memo;
          }, [])
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            description: this.description,
            permissionList: _.reduce(this.permission, (memo, entity) => {
              // Just active actions
              let activeActions = _.filter(entity.sysAction, (action) => {
                return action.activeForRole;
              });

              // Push all permissionIds
              _.each(activeActions, (action) => {
                memo.push(action.permissionId)
              });

              return memo;
            }, []),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Role;
  });
