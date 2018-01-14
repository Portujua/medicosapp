(() => {
  
  class UserSuscriptionPaymentController {
    constructor(UserService, SuscriptionService, Auth) {
      this.SuscriptionService = SuscriptionService;
      this.session = Auth.getSession();

      this.bancos = [
        '100%BANCO',
        'ABN AMRO BANK',
        'BANCAMIGA BANCO MICROFINANCIERO, C.A.',
        'BANCO ACTIVO BANCO COMERCIAL, C.A.',
        'BANCO AGRICOLA',
        'BANCO BICENTENARIO',
        'BANCO CARONI, C.A. BANCO UNIVERSAL',
        'BANCO DE DESARROLLO DEL MICROEMPRESARIO',
        'BANCO DE VENEZUELA S.A.I.C.A.',
        'BANCO DEL CARIBE C.A.',
        'BANCO DEL PUEBLO SOBERANO C.A.',
        'BANCO DEL TESORO',
        'BANCO ESPIRITO SANTO, S.A.',
        'BANCO EXTERIOR C.A.',
        'BANCO INDUSTRIAL DE VENEZUELA.',
        'BANCO INTERNACIONAL DE DESARROLLO, C.A.',
        'BANCO MERCANTIL C.A.',
        'BANCO NACIONAL DE CREDITO',
        'BANCO OCCIDENTAL DE DESCUENTO.',
        'BANCO PLAZA',
        'BANCO PROVINCIAL BBVA',
        'BANCO VENEZOLANO DE CREDITO S.A.',
        'BANCRECER S.A. BANCO DE DESARROLLO',
        'BANESCO BANCO UNIVERSAL',
        'BANFANB',
        'BANGENTE',
        'BANPLUS BANCO COMERCIAL C.A',
        'CITIBANK.',
        'CORP BANCA.',
        'DELSUR BANCO UNIVERSAL',
        'FONDO COMUN',
        'INSTITUTO MUNICIPAL DE CRÉDITO POPULAR',
        'MIBANCO BANCO DE DESARROLLO, C.A.',
        'SOFITASA',
      ];

      this.data = {
        banco: null,
        tipo_pago: 'TRANSFERENCIA',
        nro_transferencia: null,
        nro_deposito: null
      }
    }

    $onInit() {
      this.userSuscription = this.resolve.userSuscription;
    }

    save() {
      this.isSaving = true;
      let payload = angular.copy(this.data);
      delete payload.tipo_pago;

      this.loadingPromise = this.SuscriptionService.registerPayment(this.userSuscription.id, payload).then((response) => {
        this.isSaving = false;
        this.modalInstance.close(response)
      })
    }

    approve() {
      this.isSaving = true;

      this.loadingPromise = this.SuscriptionService.approve(this.userSuscription.id).then((response) => {
        this.isSaving = false;
        this.modalInstance.close(response)
      })
    }

    decline() {
      this.isSaving = true;

      this.loadingPromise = this.SuscriptionService.decline(this.userSuscription.id).then((response) => {
        this.isSaving = false;
        this.modalInstance.close(response)
      })
    }

    close() {
      this.modalInstance.dismiss('dismiss');
    }
  }
  
  angular.module('app')
    .component('userSuscriptionsPayment', {
      templateUrl: 'views/suscriptions/userSuscriptions.payment.html',
      controller: UserSuscriptionPaymentController,
      controllerAs: '$ctrl',
      bindings: {
        modalInstance: '<',
        resolve: '<'
      }
    });
  
  })();
  