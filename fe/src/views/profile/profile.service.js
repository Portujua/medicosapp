;(() => {
  
  class ProfileService {
    constructor(RESTful, Message) {
      this.RESTful = RESTful;
    }

    getSidebarButton() {
      return {
        id: 'profile',
        title: 'Perfil',
        order: 0,
        icon: 'fa-user',
        tab: {
          id: 'profile',
          component: 'usersView',
          color: 'color-4',
          icon: 'fa-user'
        },
        color: 'color-4',
      };
    }
  };
  
  angular.module('app')
    .service('ProfileService', ProfileService);
  
  })();
  