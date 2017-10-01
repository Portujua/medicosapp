    angular.module ('app')
      .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
          .state('login', {
            url: '/',
            template: '<login></login>',
            title: 'Entrar'
          })
          .state('logout', {
            url: '/logout',
            title: 'Salir',
            controller: 'LogoutController',
            // The following line, is for routes that require authentication
            resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
          })
          .state('root', {
            template: '<root></root>',
            resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
            // Remove this route from breadcrumbs
            ncyBreadcrumb: { skip: true }
          })
          .state('root.home', {
            url: '/home',
            template: '<home></home>',
            title: 'Inicio',
            resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
            // Breadcrumbs info
            ncyBreadcrumb: { label: 'Inicio' }
          });

        $urlRouterProvider.otherwise('/');
      });
