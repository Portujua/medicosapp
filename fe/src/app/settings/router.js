    angular.module ('app')
      .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
          .state('login', {
            url: '/',
            template: '<login></login>',
            title: 'Sign in'
          })
          .state('logout', {
            url: '/logout',
            title: 'Sign out',
            controller: 'LogoutController',
            // The following line, is for routes that require authentication
            //resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
          })
          .state('root', {
            template: '<root></root>',
            //resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
            // Remove this route from breadcrumbs
            ncyBreadcrumb: { skip: true }
          })
          .state('root.home', {
            url: '/home',
            template: '<home></home>',
            title: 'Home',
            resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
            // Breadcrumbs info
            ncyBreadcrumb: { label: 'Home' }
          })
          .state('root.test', {
            url: '/test',
            template: '<test></test>',
            title: 'Test',
            //resolve: { authRequired: ['Auth', (a) => { return a.checkSession(); }] },
            // Breadcrumbs info
            ncyBreadcrumb: { label: 'Test', parent: 'root.home' }
          })


          ;

        $urlRouterProvider.otherwise('/');
      });
