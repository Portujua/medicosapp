;(() => {

class ClientsNewController {
  constructor(ClientService, Client, PromptService, toastr) {
    this.ClientService = ClientService;
    this.Client = Client;
    this.PromptService = PromptService;
    this.toastr = toastr;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new this.Client({});
  }

  save() {
    this.isSaving = true;
    this.data.profilePicture = this.pic.pay;
    this.loadingPromise = this.ClientService.create(this.data.postPayload())
      .then((response) => {
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel(){
    this.modalInstance.dismiss('cancel');
  }

  addPhone(){
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
        this.data.phones.push(response);
      });
  }

  addEmail(){
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
        this.data.emails.push({ emailAddress: response });
      });
  }

  remove(field, value){
    this.data[field] = _.without(this.data[field], value);
  }

  isValid(value){
    return !_.isNull(value);
  }
}

angular.module('app')
  .component('clientsNew', {
    templateUrl: 'views/clients/clients.new.html',
    controller: ClientsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
