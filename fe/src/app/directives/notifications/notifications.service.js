;(() => {

class NotificationsService {
  constructor(RESTful, Auth, Notification) {
    this.RESTful = RESTful;
    this.session = Auth.getSession();
    this.Notification = Notification;
    this._counter = 0;
  }

  reset() {
    this._counter = 0;
  }

  get() {
    return this.RESTful.get(`users/${this.session.id}/notifications`)
  }

  set counter(value) { this._counter = value; }
  get counter() { return this._counter; }
};

angular.module('app')
  .service('NotificationsService', NotificationsService);

})();
