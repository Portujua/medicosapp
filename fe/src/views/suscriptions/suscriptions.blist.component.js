(() => {
  
  class SuscriptionBListController {
    constructor(SuscriptionService, TabManagerService, PromptService, $filter, Auth, UserService) {
      this.SuscriptionService = SuscriptionService;
      this.TabManagerService = TabManagerService;
      this.PromptService = PromptService;
      this.$filter = $filter;
      this.session = Auth.getSession();
      this.UserService = UserService;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.SuscriptionService.list({ simple: true, active: true }).then((response) => {
        this.suscriptions = response.data;
      })
    }

    buy(item) {
      this.PromptService.open({
          text: `
          <div>
            <p>La suscripción <strong>${item.nombre} (${this.$filter('currency')(item.costo, 'Bs. ')})</strong> será añadida a tu cuenta, sin embargo, para poder comenzar a disfrutar de ella debes <strong>registrar el pago</strong> mediante la sección de Suscripciones en tu perfil.</p>
          </div>
          `,
          title: 'Añadir suscripción',
          size: 'md',
          confirmButtonText: 'Entendido, añadir e ir a mi perfil',
          cancelButtonText: 'Cancelar',
        }).then(() => {
          this.loadingPromise = this.UserService.addSuscription(this.session.id, item).then((response) => {
            this.TabManagerService.add({ id: 'profile', title: 'Perfil', component: 'usersView', color: 'color-4', icon: 'fa-user' })
          })
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
  