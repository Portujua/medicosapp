;(() => {
  
  class ChatService {
    constructor(RESTful, Auth, API, $uibModal) {
      this.RESTful = RESTful;
      this.self = Auth.getSession().id;
      this._url = API.url;
      this.$uibModal = $uibModal;
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
      return this.RESTful.post('chats', payload);
    }

    upload(payload) {
      return this.RESTful.post('chats/attachment', payload)
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

    openImageModal(imageHtml) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'chatViewImage',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: true,
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'xl',
        resolve: {
          imageHtml: () => imageHtml
        }
      });
  
      return modalInstance.result;
    }
  };
  
  angular.module('app')
    .service('ChatService', ChatService);
  
  })();
  