(() => {
  
  class SuscriptionBListController {
    constructor(SuscriptionService) {
      this.SuscriptionService = SuscriptionService;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.SuscriptionService.list({ simple: true }).then((response) => {
        this.suscriptions = response.data;
      })
    }
  }
  
  angular.module('app')
    .component('suscriptionBList', {
      templateUrl: 'views/suscriptions/suscriptions.blist.html',
      controller: SuscriptionBListController,
      controllerAs: '$ctrl'
    });
  
  })();
  