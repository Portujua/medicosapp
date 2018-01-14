// http://jsfiddle.net/kQZw8/157/
let regexIso8601 = /^\d{4}-\d\d-\d\d(\s\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i;

function convertDateStringsToDates(input) {
  // Ignore things that aren't objects.
  if (typeof input !== 'object') {
    return input;
  }

  for (let key in input) {
    if (!input.hasOwnProperty(key)) {
      continue;
    }

    let value = input[key];
    let match;
    // Check for string properties which look like dates.
    // TODO: Improve this regex to better match ISO 8601 date strings.
    if (typeof value === 'string' && (match = value.match(regexIso8601))) {
      // match[1] = "THH:mm:ss:Z" or null if the date is "2017-12-25"
      // We need to append the current time THH:mm:ssZ
      match[1] = !match[1] ? new Date().toJSON().substr(10) : '';
      // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
      let milliseconds = Date.parse(match[0] + match[1]);
      if (!isNaN(milliseconds)) {
        input[key] = new Date(milliseconds);
      }
    } else if (typeof value === 'object') {
      // Recurse into object
      convertDateStringsToDates(value);
    }
  }
}

angular.module('app')
  .config(($httpProvider) => {
    $httpProvider.defaults.transformResponse.push((response) => {
      convertDateStringsToDates(response);
      return response;
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push(['$q', '$location', '$injector', ($q, $location, $injector) => {
      return {
        request: (config) => {
          let Auth = $injector.get('Auth');
          config.headers['Content-Type'] = 'application/json';
          config.headers['Auth-Token'] = Auth.getToken();

          return config || $q.when(config);
        },

        response: (response) => {
          return response || $q.when(response);
        },

        responseError: (rejection) => {
          let toastr = $injector.get('toastr'),
              Auth = $injector.get('Auth'),
              type =  'error',
              textContent = 'Algo malo ha ocurrido, por favor intenta de nuevo.';

          if (rejection.status === 401) {
            type = 'warning';

            if (_.isEmpty(Auth.getSession())) {
              textContent = 'Usuario o contraseña incorrectos.';
            } else {
              textContent = 'La sesión ha expirado.';
              // Despues de mostrar el mensaje redirijo
              Auth.goLogin();
            }
          }

          if (rejection.status === 403) {
            // Forbiden
            textContent = 'No posees los permisos para acceder.';
          }

          if (rejection.status === 404) {
            // Forbiden
            textContent = 'Lo sentimos, el recurso al que estás intentando acceder no existe.';
          }

          if (rejection.status === 400) {
            if (rejection.data && rejection.data.message) {
              // Repeated item
              if (_.contains(rejection.data.message, 'Repeated Item')) {
                textContent = 'The value you\'re trying to create already exists.';
                type = 'warning';
              }

              // Item has childrens
              if (_.contains(rejection.data.message, 'Can not delete this category, it has entities attached to it')) {
                textContent = 'Item can not be deleted because it has other related items.';
                type = 'warning';
              }

              // No coordinator
              // Personnel not in this position on job
              if (_.contains(rejection.data.message, 'Personnel not in this position on job')) {
                textContent = 'Only coordinators can do that action.';
                type = 'warning';
              }

              // Hour overlap
              if (_.contains(rejection.data.message, 'Hours Overlapped')) {
                textContent = 'The hours that you are trying to create overlap with others.';
                type = 'warning';
              }

              // Inventory quantity
              if (_.contains(rejection.data.message, 'VIOLATION:InventoryEntry.quantityAvailable  Quantity available can not be negative ')) {
                textContent = 'There aren\'t enough pieces to ship.';
                type = 'warning';
              }
            }

            // if (rejection.data && rejection.data.errors) {
            //   _.each(rejection.data.errors, (error, i) => {
            //     if (i === 0) {
            //       textContent = '';
            //     }
            //     textContent += `${error.EN_message}.<br>`;
            //   });
            //   type = 'warning';
            // }
          }

          if (rejection.status === 500) {
            textContent = rejection.data.data;
          }

          // Message
          switch (type) {
            case 'warning':
              toastr.warning(textContent, 'Información');
              break;
            default:
              toastr.error(textContent, 'Mensaje');
          }

          console.error('Failed with', rejection.status);
          return $q.reject(rejection);
        }
      };
    }]);
  });
