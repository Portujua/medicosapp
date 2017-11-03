(() => {
  
  class ChatListController {
    constructor(Auth, ChatService, NgTableParams, TabManagerService) {
      this.NgTableParams = NgTableParams;
      this.ChatService = ChatService;
      this.session = Auth.getSession();
      this.TabManagerService = TabManagerService;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.tableParams = new this.NgTableParams({ }, {
        getData: (params) => {
          this.count = params.count() * (params.page() - 1);
  
          // Query strings
          let query = {
            sort: params.orderBy(),
            page: params.page() - 1,
            size: params.count(),
            filter: params.filter()
          };
  
          return this.loadingPromise = this.ChatService.listAvailable(query)
            .then((response) => {
              // Setting the total of records
              params.total(response.data.totalElements);
              // returning list
              return response.data.content;
            });
        }
      });
    }

    openChat(user, area) {
      // Formula is sessionId + areaId + userId
      let id = this.session.id + area.id + user.id;
  
      this.TabManagerService.add({ id: id, title: `${user.nombre_completo} [${area.nombre}]`, component: 'chatsView', user: user.id, area: area.id })
    }
  }
  
  angular.module('app')
    .component('chatList', {
      templateUrl: 'views/chats/chats.list.html',
      controller: ChatListController,
      controllerAs: '$ctrl'
    });
  
  })();
  