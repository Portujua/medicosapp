;(() => {
  
  class ChatService {
    constructor(RESTful, Auth) {
      this.RESTful = RESTful;
      this.self = Auth.getSession().id;
    }

    listAvailable(query) {
      return this.RESTful.get('chats/available', query);
    }

    listMessages(area, user, page = 0) {
      area = area.id ? area.id : area;
      user = user.id ? user.id : user;

      return this.RESTful.get(`chats/${area}/${this.self}/${user}`, { page })
    }

    listUnread(area, user) {
      area = area.id ? area.id : area;
      user = user.id ? user.id : user;

      return this.RESTful.get(`chats/${area}/${this.self}/${user}`, { unread: true })
    }

    send(payload) {
      return this.RESTful.post(`chats`, payload);
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
  