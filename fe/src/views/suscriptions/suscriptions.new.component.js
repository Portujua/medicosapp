(() => {
  
  class SuscriptionNewController {
    constructor(SuscriptionService) {
      this.SuscriptionService = SuscriptionService;

      this.availableIcons = [
        'ambulance', 'heart', 'heart-o', 'heartbeat', 'medkit', 'plus-square'
      ];
    }

    $onInit() {
      this.load();
    }

    load() {
      this.SuscriptionService.list({ simple: true }).then((response) => {
        this.suscriptions = response.data;
      })
    }

    save() {
      this.isSaving = true;
      
      this.loadingPromise = this.SuscriptionService.create(this.data)
        .then((response) => {
          this.modalInstance.close(response.data);
        }).finally(() => {
          this.isSaving = false;
        });
    }
  
    cancel(){
      this.modalInstance.dismiss('cancel');
    }
  }
  
  angular.module('app')
    .component('suscriptionNew', {
      templateUrl: 'views/suscriptions/suscriptions.new.html',
      controller: SuscriptionNewController,
      controllerAs: '$ctrl',
      bindings: {
        modalInstance: '<',
        resolve: '<',
      }
    });
  
  })();
  