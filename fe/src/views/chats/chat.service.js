;(() => {
  
  class ChatService {
    constructor(RESTful) {
      this.RESTful = RESTful;
    }

    listAvailable(query) {
      return this.RESTful.get('chats/available', query);
    }

    getSidebarButton() {
      return {
        title: 'Consulta',
        icon: 'fa-stethoscope',
        tab: {
          component: 'chatList',
          color: 'color-2',
          icon: 'fa-stethoscope',
        },
        color: 'color-2',
      };
    }
  };
  
  angular.module('app')
    .service('ChatService', ChatService);
  
  })();
  