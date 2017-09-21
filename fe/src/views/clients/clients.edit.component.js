;(() => {

class ClientsEditController {
  constructor(ClientService, Client, PromptService, Auth) {
    this.ClientService = ClientService;
    this.Client = Client;
    this.PromptService = PromptService;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.Client({});
    this.loadingPromise = this.load();
  }

  load() {
    return this.ClientService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Client(response.data);
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ClientService.update(this.data.id, this.data.putPayload())
      .then((response) => {
       // Close the modal
       this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
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

      this.loadingPromise = this.ClientService.add(this.data.id, response, 'phone', true)
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

        this.loadingPromise = this.ClientService.add(this.data.id, { emailAddress: response }, 'email', true)
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
  .component('clientsEdit', {
    templateUrl: 'views/clients/clients.edit.html',
    controller: ClientsEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
