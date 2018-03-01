;(() => {

class NotificationsController {
  constructor(NotificationsService, TabManagerService, $interval) {
    this.NotificationsService = NotificationsService;
    this.TabManagerService = TabManagerService;
    this.$interval = $interval;

    this.counter = 0;
    this.prevCounter = 0;

    this.refreshPromise = $interval(() => {
      this.load()
    }, 20000)
  }

  $onInit() {
    this.load();
  }

  $onDestroy() {
    if (angular.isDefined(this.refreshPromise)) {
      this.$interval.cancel(this.refreshPromise);
    }
  }

  load() {
    this.NotificationsService.get().then((response) => {
      this.prevCounter = this.counter;

      this.notifications = response.data;
        
      let counters = _.countBy(this.notifications, (item) => {
        return item.unreadCount ? 'unread' : 'read'
      })

      this.counter = counters.unread || 0;

      // if (!this.notifications) {
      //   this.notifications = response.data;

      //   let counters = _.countBy(this.notifications, (item) => {
      //     return item.unreadCount ? 'unread' : 'read'
      //   })

      //   this.counter = counters.unread || 0;
      // }
      // else {
      //   let previousLength = this.notifications.length;

      //   for (let i = 0; i < response.data.length; i++) {
      //     let isNew = true;

      //     for (let k = 0; k < this.notifications.length; k++) {
      //       if (response.data[i].id === this.notifications[k].id) {
      //         isNew = false;
      //         break;
      //       }
      //     }

      //     if (isNew) {
      //       this.notifications.push(response.data[i]);
      //     }
      //   }

      //   if (this.notifications.length - previousLength > this.prevCounter) {
      //     this.counter = this.notifications.length - previousLength;
      //   }
      // }
    });
  }

  reset() {
    this.counter = 0;
  }

  openChat(item) {
    // Formula is sessionId + areaId + userId
    let id = item.user.id + item.area.id + item.owner.id;

    this.TabManagerService.add({ id: id, title: `${item.owner.nombre_completo} [${item.area.nombre}]`, component: 'chatsView', user: item.owner.id, area: item.area.id })
  }

  isImage(message) {
    return /^<img\ssrc="(.+)">$/.test(message.html)
  }
}

angular.module('app')
  .controller('NotificationsController', NotificationsController);

})();
