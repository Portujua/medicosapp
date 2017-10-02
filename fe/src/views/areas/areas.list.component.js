(() => {
  
  class AreasListController {
    constructor(AreaService, NgTableParams, PromptService) {
      this.AreaService = AreaService;
      this.NgTableParams = NgTableParams;
      this.PromptService = PromptService;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.tableParams = new this.NgTableParams({ }, {
        getData: (params) => {
          this.count = params.count() * (params.page() - 1);
  
          // Query strings
          let query = {
            sort: params.orderBy(),
            page: params.page() - 1,
            size: params.count(),
            filter: params.filter()
          };
  
          return this.loadingPromise = this.AreaService.list(query)
            .then((response) => {
              // Setting the total of records
              params.total(response.data.totalElements);
              // returning list
              return response.data.content;
            });
        }
      });
    }

    create() {
      this.PromptService.open({
        title:'Nueva área',
        size: 'sm',
        confirmButtonText: 'Añadir',
        inputs: [
          {
            label: 'Nombre',
            placeholder: 'ej. Odontología',
            type: 'text',
            map: 'nombre'
          }
        ]
      }).then((response) => {
        this.isSaving = true;
  
        this.loadingPromise = this.AreaService.create(response)
            .then((response) => {
              this.load();
            }).finally(() => {
              this.isSaving = false;
            });
        });
    }

    save(data, field, item) {
      this.AreaService.update(item.id, { [field]: data }, true)
    }
  
    toggleActivation(item) {
      this.AreaService.update(item.id, { estado: item.estado }, true)
    }
  }
  
  angular.module('app')
    .component('areaList', {
      templateUrl: 'views/areas/areas.list.html',
      controller: AreasListController,
      controllerAs: '$ctrl'
    });
  
  })();
  