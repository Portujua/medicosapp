;(() => {

class ClientsListController {
  constructor(ClientService, Client, Auth, TabManagerService) {
    this.ClientService = ClientService;
    this.Client = Client;
    this.session = Auth.getSession();
    this.TabManagerService = TabManagerService;

    this.searchParams = {
      page: 0,
      size: 15,
      totalElements: 0,
      totalPages: 0,
      keyword: ''
    }
  }

  $onInit() {
    this.load();
  }

  load(keyword = '') {
    return this.loadingPromise = this.loadClients(keyword)
  }

  loadClients(keyword) {
    this.searchParams.keyword = keyword;

    return this.ClientService.list(this.searchParams)
      .then((response) => {
        this.searchParams.page = response.data.number + 1;
        this.searchParams.totalElements = response.data.totalElements;

        this.data = response.data.content;

        this.loadEmails();
        this.loadPhones();
      });
  }

  loadEmails() {
    _.each(this.data, (client) => {
      this.ClientService.getEmails(client.id).then((response) => {
        client.emails = response.data;
      })
    })
  }

  loadPhones() {
    _.each(this.data, (client) => {
      this.ClientService.getPhones(client.id).then((response) => {
        client.phones = response.data;
      })
    })
  }

  create() {
    this.ClientService.openCreateModal()
      .then((response) => {
         this.load();
      }, () => { });
  }

  update(id) {
    this.ClientService.openUpdateModal(id)
      .then((response) => {
         this.load();
      }, () => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.Client(item);

    return this.ClientService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  open(client) {
    this.TabManagerService.add({ title: client.name, component: 'clientsView', id: client.id });
  }
}

angular.module('app')
  .component('clientsList', {
    templateUrl: 'views/clients/clients.list.html',
    controller: ClientsListController,
  });

})();
