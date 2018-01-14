(() => {
  
  class MedicsAreasAssignController {
    constructor(UserService, AreaService, Message) {
      this.UserService = UserService;
      this.AreaService = AreaService;
      this.Message = Message;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.loadingPromise = this.AreaService.list({ simple: true, size: 200000000 }).then((response) => {
        this.areas = response.data;

        console.log(this.medic)
        console.log(this.areas)

        _.each(this.medic.areas, (medicArea) => {
          _.each(this.areas, (area) => {
            area.asignada = medicArea.id === area.id;
          })
        })
      })
    }
  
    toggleActivation(item) {
      let promise = item.asignada 
                    ? this.UserService.assignArea(this.medic.id, item.id)
                    : this.UserService.unassignArea(this.medic.id, item.id);

      promise.then((response) => {
        this.Message.update('usuario');
      }, () => {
        // In case any errors occurs
        item.asignada = !item.asignada;
      })
    }
  }
  
  angular.module('app')
    .component('medicsAreasAssign', {
      templateUrl: 'views/medics/medicsAreas.assign.html',
      controller: MedicsAreasAssignController,
      controllerAs: '$ctrl',
      bindings: {
        medic: '='
      }
    });
  
  })();
  