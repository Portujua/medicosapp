angular.module('app')
.factory('User', () => {

  class User extends BaseFactory {
    constructor({ apellido = null, cambiar_contrasena = null, cedula = null, createdAt = null, modifiedAt = null, direccion = null, email = null, email_validado = null, estado = null, estado_civil = null, fecha_nacimiento = null, id = null, lugar = null, nombre = null, segundo_apellido = null, segundo_nombre = null, sexo = null, tipo_cedula = null, token = null, usuario = null, contrasena = null, es_medico = false, areas = null }) {
      // Parent
      super({ apellido, cambiar_contrasena, cedula, createdAt, modifiedAt, direccion, email, email_validado, estado, estado_civil, fecha_nacimiento, id, lugar, nombre, segundo_apellido, segundo_nombre, sexo, tipo_cedula, token, usuario, contrasena, es_medico, areas });

      let regexIso8601 = /^\d{4}-\d\d-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i;
      let match;

      if (typeof this.fecha_nacimiento === 'string' && (match = this.fecha_nacimiento.match(regexIso8601))) {
        // match[1] = "THH:mm:ss:Z" or null if the date is "2017-12-25"
        // We need to append the current time THH:mm:ssZ
        match[1] = !match[1] ? new Date().toJSON().substr(10) : '';
        // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
        let milliseconds = Date.parse(match[0] + match[1]);
        if (!isNaN(milliseconds)) {
          this.fecha_nacimiento = new Date(milliseconds);
        }
      }
    }

    postPayload() {
      return {
        nombre: this.nombre,
        segundo_nombre: this.segundo_nombre,
        apellido: this.apellido,
        segundo_apellido: this.segundo_apellido,
        tipo_cedula: this.tipo_cedula,
        cedula: this.cedula,
        email: this.email,
        direccion: this.direccion,
        estado_civil: this.estado_civil,
        fecha_nacimiento: this.fecha_nacimiento,
        lugar: this.lugar,
        sexo: this.sexo,
        usuario: this.usuario,
        contrasena: this.contrasena,
        es_medico: this.es_medico
      };
    }

    putPayload(field, value) {
      if (_.isEmpty(field)) {
        // Bulk update
        return {
          // todo
        };
      }

      // Edit In-place update
      return {
        [field]: value,
      };
    }
  };

  return User;
});
