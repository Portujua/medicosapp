(() => {
  
  class UserChangePasswordController {
    constructor(Auth, User, UserService, LocationService, PromptService, PhoneService, TabManagerService) {
      this.Auth = Auth;
      this.User = User;
      this.UserService = UserService;
      this.LocationService = LocationService;
      this.PromptService = PromptService;
      this.PhoneService = PhoneService;
      this.UserService = UserService;
      this.TabManagerService = TabManagerService;
      this.session = Auth.getSession();
    }

    $onInit() {
      this.data = new this.User(this.resolve.user);
      console.log(this.data.putPayload('contrasena', 'this.newPassword'))
    }

    save() {
      this.loadingPromise = this.UserService.update(this.data.id, this.data.putPayload('contrasena', this.newPassword), true)
        .then((response) => {
          this.modalInstance.close(true);
        });
    }

    cancel() {
      this.modalInstance.cancel();
    }
  }
  
  angular.module('app')
    .component('usersChangePasswordModal', {
      templateUrl: 'views/users/usersChangePassword.modal.html',
      controller: UserChangePasswordController,
      controllerAs: '$ctrl',
      bindings: {
        modalInstance: '<',
        resolve: '<',
      }
    });
  
  })();
  