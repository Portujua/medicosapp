(() => {
  
  class AdminViewController {
    constructor(AdminService) {
      this.AdminService = AdminService;
    }

    $onInit() {
      
    }
  }
  
  angular.module('app')
    .component('adminView', {
      templateUrl: 'views/admin/admin.view.html',
      controller: AdminViewController,
      controllerAs: '$ctrl'
    });
  
  })();
  