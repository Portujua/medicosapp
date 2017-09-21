;(() => {

class ContractsNewController {
  constructor(Auth, ContractService, Contract, PromptService) {
    this.session = Auth.getSession();
    this.ContractService = ContractService;
    this.Contract = Contract;
    this.PromptService = PromptService;
  }

  $onInit() {
    this.data = new this.Contract({});
    this.loadingPromise = this.loadCurrencies() || this.loadTermUnits();
  }

  ok() {

    this.isSaving = true;

    this.loadingPromise = this.ContractService.create(this.data.postPayload())
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

  loadCurrencies() {
    this.ContractService.getCurrencies()
      .then((response) => {
        this.currencies = response.data.content;
      })
  }

  loadTermUnits() {
    this.ContractService.getTermUnits()
      .then((response) => {
        this.termUnits = response.data.content;
      })
  }

  addTerm() {
    this.PromptService.open({
      title: 'New Term',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Description',
          placeholder: '',
          map: 'description',
          type: 'textarea',
        },
        {
          label: 'Reference Cost',
          placeholder: '',
          map: 'referenceCost',
          type: 'number',
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
      this.data.contractTerms.push({
        description: response.description,
        referenceCost: parseFloat(response.referenceCost),
        termUnit: response.termUnit
      });
    });
  }

  removeTerm(value){
    this.data.contractTerms = _.without(this.data.contractTerms, value);
  }
}

angular.module('app')
  .component('contractsNew', {
    templateUrl: 'views/contracts/contracts.new.html',
    controller: ContractsNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
