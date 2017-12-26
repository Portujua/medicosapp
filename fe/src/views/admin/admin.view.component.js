(() => {
  
  class AdminViewController {
    constructor(AdminService) {
      this.AdminService = AdminService;
    }

    $onInit() {
      this.load();
    }

    load() {
      // this.loadingPromise = this.MercadoPago.summary().then((response) => {
      //   this.summary = response.data;
      // })
    }
  }
  
  angular.module('app')
    .component('adminView', {
      templateUrl: 'views/admin/admin.view.html',
      controller: AdminViewController,
      controllerAs: '$ctrl'
    });
  
  })();
  