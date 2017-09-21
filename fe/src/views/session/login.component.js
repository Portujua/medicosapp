;(() => {

class LoginController {
  constructor(Auth, PageService) {
    this.Auth = Auth;
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
}

angular.module('app')
  .component('login', {
    templateUrl: 'views/session/login.html',
    controller: LoginController,
  });

})();
