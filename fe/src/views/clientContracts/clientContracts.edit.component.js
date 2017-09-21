;(() => {

class ClientContractEditController {
  constructor(ClientContractService, ClientContract, Auth, PromptService, $stateParams) {
    this.ClientContractService = ClientContractService;
    this.ClientContract = ClientContract;
    this.session = Auth.getSession();
    this.PromptService = PromptService;

    this.$stateParams = $stateParams;

    this.entity = this.$stateParams.entity;
  }

  $onInit() {
    this.data = new this.ClientContract({});

    this.loadingPromise = this.loadTermUnits();
  }

  load() {
    return this.ClientContractService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.ClientContract(response.data);
      });
  }

  toggleActivation() {
    this.ClientContractService.toggleActivation(this.data.id, this.data.isActive)
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

    this.loadingPromise = this.ClientContractService.update(this.data.id, this.data.putPayload())
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
    this.ClientContractService.getTermUnits()
      .then((response) => {
        this.termUnits = response.data.content;
        this.loadingPromise = this.load();
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
      this.ClientContractService.addTerm(this.data.id, response)
        .then(() => {
          this.data.terms.push(response);
        })
    });
  }

  removeTerm(term){
    this.ClientContractService.deleteTerm(term.id)
      .then(() => {
        this.data.terms = _.without(this.data.terms, term);
      })
  }

  updateTerm(term){
    this.PromptService.open({
      title:'Edit Term',
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Description',
          placeholder: '',
          map: 'description',
          type: 'textarea',
          value: term.description
        },
        {
          label: 'Reference cost',
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
      let _term = {
        id: term.id,
        description: response.description,
        referenceCost: response.referenceCost,
        termUnit: response.termUnit
      }

      this.ClientContractService.updateTerm(term.id, response)
        .then(() => {
          this.loadingPromise = this.load();
        })
    });
  }
}

angular.module('app')
  .component('clientContractsEdit', {
    templateUrl: 'views/clientContracts/clientContracts.edit.html',
    controller: ClientContractEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
