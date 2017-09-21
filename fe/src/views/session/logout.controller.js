;(() => {

class LogoutController {
  constructor(Auth) {
    this.Auth = Auth;
  }

  $onInit() {
    this.Auth.goLogin();
  }
}

angular.module('app')
  .controller('LogoutController', LogoutController);

})();
