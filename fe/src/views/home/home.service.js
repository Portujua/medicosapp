;(() => {

class HomeService extends BaseService {
  constructor($uibModal, RESTful, Message) {
    super();
    this.$uibModal = $uibModal;
    this.RESTful = RESTful;
    this.Message = Message;
  }

  getSidebarButton() {
    return {
      title: 'Inicio',
      icon: 'fa-home',
      order: -1,
      tab: {
        id: 'Inicio',
        title: 'Inicio',
        component: 'home',
        icon: 'fa-home',
        isPinned: true,
        order: -1,
        isThin: true,
      },
    };
  }

  openSettings() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'homeSettingsView',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: { }
    });

    return modalInstance.result;
  }

  listMyDashboardItems() {
    return this.RESTful.get('me/dashboard-entries', { selected: true });
  }

  listAvailableDashboardItems() {
    return this.RESTful.get('dashboard-entries', { available: true });
  }

  saveDashboard(payload) {
    return this.RESTful.post('me/dashboard-entries', payload)
      .then((response) => {
        this.Message.update('home setting');
      });
  }

  getSummary() {
    return this.RESTful.get('dashboard-entries/summary')
  }
};

angular.module('app')
  .service('HomeService', HomeService);

})();
