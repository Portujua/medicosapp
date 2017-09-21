;(() => {

class ContractsEditController {
  constructor(ContractService, Contract, Auth, PromptService) {
    this.ContractService = ContractService;
    this.Contract = Contract;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
  }

  $onInit() {
    this.data = new this.Contract({});
    this.loadingPromise = this.load() && this.loadTermUnits();
  }

  load() {
    return this.loadingPromise = this.ContractService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.Contract(response.data);
      });
  }

  toggleActivation() {
    this.ContractService.toggleActivation(this.data.id, this.data.isActive)
      .then((response) => {

      }, (response) => {
        this.data.isActive = !this.data.isActive;
      });
  }

  ok() {
    this.isSaving = true;

    if (_.isString(this.data.currency)) {
      this.data.currency = JSON.parse(this.data.currency);
    }

    this.loadingPromise = this.ContractService.update(this.data.id, this.data.putPayload())
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
      this.ContractService.addTerm(this.data.id, response)
        .then(() => {
          this.data.contractTerms.push(response);
        })
    });
  }

  removeTerm(term){
    this.ContractService.deleteTerm(term.id)
      .then(() => {
        this.data.contractTerms = _.without(this.data.contractTerms, term);
      })
  }

  updateTerm(term){
    this.PromptService.open({
      title: 'Edit Term',
      size: 'sm',
      confirmButtonText: 'Update',
      inputs: [
        {
          label: 'Description',
          placeholder: '',
          map: 'description',
          type: 'textarea',
          value: term.description
        },
        {
          label: 'Reference Cost',
          placeholder: '',
          map: 'referenceCost',
          type: 'number',
          value: term.referenceCost
        }
      ],
      selects: [
        {
          label: 'Unit',
          idField: null,
          nameField: 'itemValue',
          map: 'termUnit',
          data: this.termUnits,
          value: term.termUnit
        }
      ]
    }).then((response) => {
      this.ContractService.updateTerm(term.id, response)
        .then(() => {
          this.load();
        })
    });
  }
}

angular.module('app')
  .component('contractsEdit', {
    templateUrl: 'views/contracts/contracts.edit.html',
    controller: ContractsEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
