;(() => {

class ClientContractsViewController {
  constructor(ClientContractService, ClientContract, Auth, PromptService, NgTableParams) {
    this.ClientContractService = ClientContractService;
    this.ClientContract = ClientContract;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.NgTableParams = NgTableParams;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.ClientContractService.get(this.id)
      .then((response) => {
        this.data = new this.ClientContract(response.data);

        this.tableParams = new this.NgTableParams({ }, {
          dataset: response.data.terms,
        });
      })
      .then((response) => {
        return this.ClientContractService.getTermUnits()
          .then((response) => {
            this.termUnits = response.data.content;
          });
      });
  }

  save(data, field) {
    return this.ClientContractService.update(this.data.id, this.data.putPayload(field, data), true)
      .then((response) => {
        // this.load();
      }, (response) => {
        return ' ';
      });
  }

  toggleActivation(item) {
    this.ClientContractService.toggleActivation(item.id, item.isActive)
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
      this.ClientContractService.addTerm(this.data.id, response)
        .then(() => {
          this.load();
        })
    });
  }

  removeTerm(term) {
    this.isDeleting = true;

    this.loadingPromise = this.ClientContractService.deleteTerm(term.id)
      .then(() => {
        this.load();
      })
      .finnaly(() => {
        this.isDeleting = false;
      });
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
  .component('clientContractsView', {
    templateUrl: 'views/clientContracts/clientContracts.view.html',
    controller: ClientContractsViewController,
    bindings: {
      id: '@',
    }
  });

})();
