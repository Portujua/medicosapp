;(() => {

class Auth {
  constructor(RESTful, StorageService, $q, $timeout, Session, $state, $uibModalStack, $rootScope) {
    this.RESTful = RESTful;
    this.StorageService = StorageService;
    this.$q = $q;
    this.$timeout = $timeout;
    this.Session = Session;
    this.$state = $state;
    this.$uibModalStack = $uibModalStack;
    this.$rootScope = $rootScope;
  }

  _setUser(response) {
    this._session = new this.Session({
      username: response.data.username,
      email: response.data.email,
      name: response.data.name,
      expirationTime: response.data.expirationTime,
      resetPassword: response.data.resetPassword,
      id: response.data.id,
      role: response.data.role,
      profilePicturePath: response.data.profilePicturePath,
      token: response.headers('X-Auth-Token'),
    });

    this.saveSession();

    return this._session;
  }

  changePicture(img) {
    this._session.profilePicturePath = `${img}?${(new Date()).getTime()}`;
    this.saveSession();
  }

  saveSession() {
    this.StorageService.put('session', this._session.getObject(), 's');
  }

  goHome() {
    this.$timeout(() => {
      this.$state.go('root.home');
    });
  }

  goLogin(reload) {
    this.$timeout(() => {
      this.$state.go('login');
    });
  }

  login(credentials) {
    let deferred = this.$q.defer();

    this.RESTful.post('auth', credentials, null, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    }, true)
      .then((response) => {

        deferred.resolve(this._setUser(response));
      }, (response) => {
        deferred.reject(response);
      });

    return deferred.promise;
  }

  _destroy() {
    return this.$timeout(() => {
      this._session = undefined;
      this.StorageService.clear('session');
      this.StorageService.clear('local');

      // Close all modals
      this.$uibModalStack.dismissAll();
    });
  }

  logout() {
    return this._destroy();
  }

  getSession() {
    if (_.isEmpty(this._session)) {
      let cachedSession = this.StorageService.get('session', 's');

      if (!_.isEmpty(cachedSession)) {
        this._session = new this.Session(cachedSession);
      }
    }
    return this._session;
  }

  getToken() {
    if (_.isEmpty(this.getSession())) {
      return;
    }
    return this._session.token;
  }

  checkSession() {
    let deferred = this.$q.defer();

    if (_.isEmpty(this.getSession())) {
      deferred.reject();
      this.goLogin();
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }
};

angular.module('app')
  .service('Auth', Auth);

})();
