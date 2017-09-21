;(() => {

class NotificationsService {
  constructor(RESTful, $timeout, Notification) {
    this.RESTful = RESTful;
    this.$timeout = $timeout;
    this.Notification = Notification;
    this._counter = 0;
  }

  reset() {
    this._counter = 0;
  }

  get() {
    return this.$timeout(() => {
      let notifications = [
        new this.Notification({
          user: { name: 'Dave Lister' },
          mention: { name: '100015' },
          type: 'comment',
          status: 'unread',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime amet quod voluptate commodi laborum reiciendis repellat fuga architecto nihil quo, facilis possimus temporibus voluptatibus tempora. Optio blanditiis, quo quia tempora.'
        }),
        new this.Notification({
          user: { name: '100012' },
          type: 'sync',
          status: 'unread',
        }),
        new this.Notification({
          user: { name: 'Tour Hours: 12/May/2017 @ 00:00 to 06:00' },
          mention: { name: '100015' },
          type: 'approvement',
          status: 'warning',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime amet quod voluptate commodi laborum reiciendis repellat fuga architecto nihil quo, facilis possimus temporibus voluptatibus tempora. Optio blanditiis, quo quia tempora.'
        }),
        new this.Notification({
          user: { name: '100012' },
          type: 'fail',
          status: 'danger',
        }),
        new this.Notification({
          user: { name: '100015' },
          mention: { name: 'Standby' },
          type: 'status',
          status: 'unread',
        }),
        new this.Notification({
          user: { name: '100015' },
          type: 'sidetrack',
          status: 'read',
        }),
        new this.Notification({
          user: { name: 'Bazuka 3000' },
          type: 'attachment',
          status: 'read',
        }),
        new this.Notification({
          user: { name: 'Dave Lister' },
          type: 'mention',
          status: 'unread',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime amet quod voluptate commodi laborum reiciendis repellat fuga architecto nihil quo, facilis possimus temporibus voluptatibus tempora. Optio blanditiis, quo quia tempora.'
        }),
      ];

      this._counter = notifications.length;

      return notifications;
    }, 1000);
  }

  set counter(value) { this._counter = value; }
  get counter() { return this._counter; }
};

angular.module('app')
  .service('NotificationsService', NotificationsService);

})();
