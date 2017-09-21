;(() => {

class NotificationsController {
  constructor(NotificationsService) {
    this.NotificationsService = NotificationsService;

    NotificationsService.get()
      .then((response) => {
        this.notifications = response;
      });
  }

  emulate(e) {

  }
}

angular.module('app')
  .controller('NotificationsController', NotificationsController);

})();
