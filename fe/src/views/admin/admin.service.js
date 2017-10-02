;(() => {
  
  class AdminService {
    constructor(RESTful, Auth) {
      this.RESTful = RESTful;
      this.session = Auth.getSession();
    }

    getSidebarButton() {
      if (!this.session.isAdmin()) {
        return null;
      }

      return {
        title: 'Administración',
        icon: 'fa-cogs',
        tab: {
          component: 'adminView',
          color: 'color-10'
        },
        color: 'color-10',
      };
    }
  };
  
  angular.module('app')
    .service('AdminService', AdminService);
  
  })();
  