;(() => {

class ClientContractsNewController {
  constructor(Auth, ClientContractService, ClientContract, PromptService, $stateParams) {
    this.session = Auth.getSession();
    this.ClientContractService = ClientContractService;
    this.ClientContract = ClientContract;
    this.PromptService = PromptService;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.data = new this.ClientContract({ client: this.resolve.client });

    this.loadingPromise = this.loadTermUnits();
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ClientContractService.create(this.data.postPayload())
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

  // loadClients() {
  //   this.ClientContractService.getClients()
  //     .then((response) => {
  //       this.clients = response.data.content;
  //     })
  // }

  getContracts(keyword) {
    return this.ClientContractService.getContracts(keyword)
      .then((response) => {
        return response.data;
      })
  }

  loadTermUnits() {
    this.ClientContractService.getTermUnits()
      .then((response) => {
        this.termUnits = response.data.content;
      })
  }

  addTerm() {
    this.PromptService.open({
      title:'New Term',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Description',
          placeholder: '',
          map: 'description',
          type: 'textarea'
        },
        {
          label: 'Reference Cost',
          placeholder: '',
          map: 'referenceCost',
          type: 'number'
        }
      ],
      selects: [
        {
          label: 'Unit',
          idField: null,
          nameField: 'itemValue',
          map: 'termUnit',
          data: this.termUnits
        }
      ]
    }).then((response) => {
      this.data.terms.push({
        description: response.description,
        referenceCost: parseFloat(response.referenceCost),
        termUnit: response.termUnit
      });
    });
  }

  removeTerm(value){
    this.data.terms = _.without(this.data.terms, value);
  }
}

angular.module('app')
  .component('clientContractsNew', {
    templateUrl: 'views/clientContracts/clientContracts.new.html',
    controller: ClientContractsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
