;(() => {

class ContractsDashboardController {
  constructor(ContractService, Contract, Auth, PromptService, ClientContractService, NgTableParams) {
    this.ContractService = ContractService;
    this.Contract = Contract;
    this.PromptService = PromptService;
    this.ClientContractService = ClientContractService;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
  }

  $onInit() {

  }

  $onChanges() {
    if (!_.isEmpty(this.clientContract)) {
      // If the id isnt empty we must load our data
      this.load();
    }
  }

  load() {
    this.loadingPromise = this.ContractService.get(this.clientContract.contract.id)
      .then((response) => {
        this.data = response.data;

        this.tableParams = new this.NgTableParams({ }, {
          dataset: response.data.contractTerms,
        });
      })
      .then((response) => {
        return this.ClientContractService.getTermUnits()
          .then((response) => {
            this.termUnits = response.data.content;
          });
      });
  }

  getCurrencies() {
    this.ContractService.getCurrencies()
      .then((response) => {
        this.currencies = response.data.content;
      });
  }

  save(data, field) {
    let obj = new this.Contract(this.data);

    return this.ContractService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {
        // this.load();
      }, (response) => {
        return '';
      });
  }

  toggleActivation(item) {
    this.ContractService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
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
      this.ContractService.addTerm(this.data.id, response)
        .then(() => {
          this.load();
        })
    });
  }

  removeTerm(term) {
    this.isDeleting = true;

    this.loadingPromise = this.ContractService.deleteTerm(term.id)
      .then(() => {
        this.load();
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

  updateTerm(term) {
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

      this.ContractService.updateTerm(term.id, response)
        .then(() => {
          this.loadingPromise = this.load();
        })
    });
  }
}

angular.module('app')
  .component('contractsDashboard', {
    templateUrl: 'views/contracts/contracts.dashboard.html',
    controller: ContractsDashboardController,
    bindings: {
      clientContract: '<',
    }
  });

})();
