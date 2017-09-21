;(() => {

class ClientsViewController {
  constructor(ClientService, Client, Auth, PromptService, TabManagerService) {
    this.ClientService = ClientService;
    this.Client = Client;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.TabManagerService = TabManagerService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.ClientService.get(this.id)
      .then((response) => {
        this.data = new this.Client(response.data);
        this.loadPhones();
      })
  }

  loadPhones() {
    this.loadingPromise = this.ClientService.getPhones(this.data.id)
      .then((response) => {
        this.data.phones = response.data;
        this.loadEmails();
      })
  }

  loadEmails() {
    this.loadingPromise = this.ClientService.getEmails(this.data.id)
    .then((response) => {
      this.data.emails = response.data;
    })
  }

  save(data, field) {
    return this.ClientService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // Change tab's title
        field === 'name' ? this.TabManagerService.updateTitle(this.tabId, data) : 1;
      }, (response) => {
        return '';
      });
  }

  update() {
    this.ClientService.openUpdateModal(this.data.id)
      .finally(() => {
        this.load();
      });
  }

  updateClient() {
    this.ClientService.openUpdateModal(this.data.client.id)
      .then((response) => {
        this.data.client = response;
      });
  }

  addPhone() {
    this.PromptService.open({
      title:'New phone',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Country Code',
          placeholder: 'i.e. 58',
          type: 'number',
          min: 0,
          map: 'countryCode'
        },
        {
          label: 'Area Code',
          placeholder: 'i.e. 212',
          type: 'number',
          min: 0,
          map: 'areaCode'
        },
        {
          label: 'Phone Number',
          placeholder: 'i.e. 5555555',
          type: 'number',
          min: 0,
          map: 'phoneNumber'
        }
      ]
    }).then((response) => {
      this.isSaving = true;

      this.loadingPromise = this.ClientService.add(this.data.id, response, 'phones', true)
          .then((response) => {
            this.load();
          }).finally(() => {
            this.isSaving = false;
          });
      });
  }

  addEmail() {
    this.PromptService.open({
      title:'New email',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter a email...',
          pattern: /^.+@.+\..+$/,
        }
      ],
    })
      .then((response) => {
        this.isSaving = true;

        this.loadingPromise = this.ClientService.add(this.data.id, { emailAddress: response }, 'emails', true)
          .then((response) => {
           this.load();
          }).finally(() => {
            this.isSaving = false;
          });
      });
  }

  delete(field, fieldID){
    this.ClientService.delete(field, fieldID)
      .then((response) => {
        this.load();
      });
  }
}

angular.module('app')
  .component('clientsView', {
    templateUrl: 'views/clients/clients.view.html',
    controller: ClientsViewController,
    bindings: {
      id: '@',
      tabId: '@',
    }
  });

})();
