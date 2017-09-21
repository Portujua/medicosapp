angular.module('app')
  .config(($translateProvider) => {
    $translateProvider.translations('en', {
        '¡Hola mundo!': 'Hello world!',
      });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  });
