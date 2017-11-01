;(() => {

class LoginController {
  constructor(Auth, PageService, UserService) {
    this.Auth = Auth;
    this.UserService = UserService;
    this.credentials = {
      username: null,
      password: null,
    }

    this.PageService = PageService;
  }

  $onInit() {
    this.Auth.logout();
  }

  login(credentials) {
    this.isLoading = true;
    this.isError = false;

    this.Auth.login(credentials)
      .then((response) => {
        this.Auth.goHome();
      }, (response) => {
        this.isError = true;
      }).finally(() => {
        this.isLoading = false;
      });
  }

  create() {
    this.UserService.openCreateModal().then((response) => {
      if (response.usuario && response.contrasena) {
        this.credentials = {
          username: response.usuario,
          password: response.contrasena
        }

        this.login(this.credentials)
      }
    })
  }
}

angular.module('app')
  .component('login', {
    templateUrl: 'views/session/login.html',
    controller: LoginController,
  });

})();
