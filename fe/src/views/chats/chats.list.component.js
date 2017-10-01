(() => {
  
  class ChatListController {
    constructor(ChatService, NgTableParams) {
      this.NgTableParams = NgTableParams;
      this.ChatService = ChatService;
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
  }
  
  angular.module('app')
    .component('chatList', {
      templateUrl: 'views/chats/chats.list.html',
      controller: ChatListController,
      controllerAs: '$ctrl'
    });
  
  })();
  