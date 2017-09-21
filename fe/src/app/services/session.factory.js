angular.module('app')
  .factory('Session', (StorageService) => {

    class Session extends BaseFactory {
      constructor({ id = null, username = null, token = null, name = null, role = null, email = null, profilePicturePath = null, expirationTime = 60, isActive = true }) {
        // Parent
        super({ id, username, token, name, role, email, profilePicturePath, expirationTime, isActive });

        // Sort permissions
        this.role.permission = _.sortBy(this.role.permission, (entity) => entity.entityName);

        _.each(this.role.permission, (value) => {
          // Sort actions
          value.sysAction = _.sortBy(value.sysAction, (action) => action.actionName);
          // Uppercase to all entity
          value.entityName = _.isEmpty(value.entityName) || !_.isString(value.entityName) ? null : value.entityName.toUpperCase();
        });
      }

      // Permissions
      can(entityName = null, action = null) {        
        if (_.isEmpty(entityName) || !_.isString(entityName)) {
          return false;
        }

        if (_.isEmpty(action) || !_.isString(action)) {
          return false;
        }

        // All in UpperCase
        entityName = entityName.toUpperCase();
        action = action.toUpperCase();

        let isEntityNameExists = _.findWhere(this.role.permission, { entityName });

        if (!_.isEmpty(isEntityNameExists)) {
          return _.contains(_.map(isEntityNameExists.sysAction, (value) => {
            return value.actionName.toUpperCase();
          }), action);
        }

        return false;
      }

      printPermissions() {
        let table = _.reduce(this.role.permission, (memo, entity, key, list) => {
          _.each(entity.sysAction, (action) => {
            memo.push({
              entity: entity.entityName,
              action: action.actionName,
            });
          });
          return memo;
        }, []);

        console.table(table);
      }
    };

    return Session;
  });
