// http://jsfiddle.net/kQZw8/157/
let regexIso8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;

function convertDateStringsToDates(input) {
  // Ignore things that aren't objects.
  if (typeof input !== 'object') {
    return input;
  }

  for (let key in input) {
    if (!input.hasOwnProperty(key)) continue;

    let value = input[key];
    let match;
    // Check for string properties which look like dates.
    // TODO: Improve this regex to better match ISO 8601 date strings.
    if (typeof value === 'string' && (match = value.match(regexIso8601))) {
      // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
      let milliseconds = Date.parse(match[0]);
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

    return;

    $httpProvider.interceptors.push(['$q', '$location', '$injector', ($q, $location, $injector) => {
      return {
        request: (config) => {
          let Auth = $injector.get('Auth');
          config.headers['X-Auth-Token'] = Auth.getToken();

          return config || $q.when(config);
        },

        response: (response) => {
          return response || $q.when(response);
        },

        responseError: (rejection) => {
          let toastr = $injector.get('toastr'),
              Auth = $injector.get('Auth'),
              textContent = 'Something went wrong. Please, try again.';

          if (rejection.status === 401) {
            if (_.isEmpty(Auth.getSession())) {
              textContent = 'Wrong email/password combination.';
            } else {
              textContent = 'Your session has expired. Re-enter your credentials.';
              // Despues de mostrar el mensaje redirijo
              Auth.goLogin();
            }
          }

          if (rejection.status === 403) {
            // Forbiden
            textContent = 'Your permissions are not sufficient to access this feature.';
          }

          if (rejection.status === 404) {
            // Forbiden
            textContent = 'Sorry but the service you are looking for has not be found.';
          }

          // if (rejection.status === 400 && !_.isEmpty(rejection.data) && !_.isEmpty(rejection.data.message)) {
          //   // Bad request. Invalid attr
          //   if (s.contains(rejection.data.message, 'The given password does not match')) {
          //     textContent = 'Hemos detectado que la clave actual introducida es incorrecta.';
          //   }

          //   if (s.contains(rejection.data.message, 'Already merged account in')) {
          //     textContent = 'Una de las cuentas seleccionadas ya ha sido compensada.';
          //   }

          //   if (s.contains(rejection.data.message, 'Error while importing BankTransactions, balances do not match')) {
          //     textContent = 'El saldo final no fue el esperado.';
          //   }

          //   if (s.contains(rejection.data.message, 'Accounts can not be of the same client')) {
          //     textContent = 'Las cuentas no pueden pertenecer al mismo cliente.';
          //   }

          //   if (s.contains(rejection.data.message, 'Amount overflows account total amount')) {
          //     textContent = 'El monto sobrepasa el monto total de la cuenta.';
          //   }

          //   if (s.contains(rejection.data.message, 'required documents are missing')) {
          //     textContent = 'Faltan algunos documentos requeridos.';
          //   }

          //   if (s.contains(rejection.data.message, 'Password must cointain special characters')) {
          //     textContent = 'La nueva clave debe contener mínimo 8 caracteres con al menos 1 letra y 1 caracter especial.';
          //   }

          //   if (s.contains(rejection.data.message, 'User with email:')) {
          //     textContent = 'Ya se ha registrado un usuario con ese mismo correo.';
          //   }

          //   if (s.contains(rejection.data.message, 'IdentificationDocumentNumber')) {
          //     textContent = 'El número de documento ya ha sido registrado anteriormente.';
          //   }

          //   if (s.contains(rejection.data.message, 'Nickname')) {
          //     textContent = 'El alias ya ha sido registrado anteriormente.';
          //   }
          //   console.log(rejection.data);
          // }

          // message.show(_.isEmpty(textContent) ? undefined : textContent);

          // return $q.reject(rejection);

          // Message
          toastr.error(textContent, 'Message');

          console.error('Failed with', rejection.status);
          return $q.reject(rejection);
        }
      };
    }]);
  });
