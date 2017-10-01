angular.module('app')
  .factory('Session', (StorageService) => {

    class Session extends BaseFactory {
      constructor({ apellido = null, cambiar_contrasena = null, cedula = null, createdAt = null, modifiedAt = null, direccion = null, email = null, email_validado = null, estado = null, estado_civil = null, fecha_nacimiento = null, id = null, lugar = null, nombre = null, segundo_apellido = null, segundo_nombre = null, sexo = null, tipo_cedula = null, token = null, usuario = null }) {
        // Parent
        super({ apellido, cambiar_contrasena, cedula, createdAt, modifiedAt, direccion, email, email_validado, estado, estado_civil, fecha_nacimiento, id, lugar, nombre, segundo_apellido, segundo_nombre, sexo, tipo_cedula, token, usuario });
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
    };

    return Session;
  });
