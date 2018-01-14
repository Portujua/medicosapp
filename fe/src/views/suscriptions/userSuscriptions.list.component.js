(() => {
  
  class UserSuscriptionListController {
    constructor(UserService, NgTableParams, SuscriptionService, TabManagerService, Auth) {
      this.UserService = UserService;
      this.NgTableParams = NgTableParams;
      this.SuscriptionService = SuscriptionService;
      this.TabManagerService = TabManagerService;
      this.session = Auth.getSession();
      
      this.hideTable = false;
    }

    $onInit() {
      this.self = this.session.id === this.user;

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
  
          return this.loadingPromise = this.UserService.listSuscriptions(this.user, query)
            .then((response) => {
              this.hideTable = response.data.content.length === 0;

              // Setting the total of records
              params.total(response.data.totalElements);
              // returning list
              return response.data.content;
            });
        }
      });
    }

    create() {
      this.SuscriptionService.openCreateModal()
    }

    save(data, field, item) { 
      this.SuscriptionService.update(item.id, { [field]: data }, true)
    }
  
    toggleActivation(item) {
      this.SuscriptionService.update(item.id, { estado: item.estado }, true)
    }

    openSuscriptions() {
      this.TabManagerService.add({ title: 'Suscripciones', component: 'suscriptionBList', color: 'color-1' })
    }

    openPaymentModal(item) {
      this.SuscriptionService.openPaymentModal(item).then((response) => {
        this.load();
      })
    }
  }
  
  angular.module('app')
    .component('userSuscriptionsList', {
      templateUrl: 'views/suscriptions/userSuscriptions.list.html',
      controller: UserSuscriptionListController,
      controllerAs: '$ctrl',
      bindings: {
        user: '=',
        listOnly: '='
      }
    });
  
  })();
  