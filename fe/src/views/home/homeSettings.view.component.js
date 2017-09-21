;(() => {

class HomeSettingsController {
  constructor(HomeService, $filter, ReportService) {
    this.HomeService = HomeService;
    this.$filter = $filter;
    this.ReportService = ReportService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.models = {
      selected: null,
      lists: {
        available: [],
        showing: []
      }
    };

    this.loadingPromise = this.HomeService.listAvailableDashboardItems().then((response) => {
      this.models.lists.available = response.data;

      this.loadingPromise = this.HomeService.listMyDashboardItems().then((response) => {
        let data = response.data;

        // We remove from available ones the selected ones
        let newList = [];

        for (let i = 0; i < this.models.lists.available.length; i++) {
          let c = false;

          for (let k = 0; k < data.length; k++) {
            c = c | data[k].id.toUpperCase() === this.models.lists.available[i].id.toUpperCase();
          }

          if (!c) {
            newList.push(this.models.lists.available[i]);
          }
        }

        this.models.lists.available = newList;
        this.models.lists.showing = data;
      })
    })
  }

  selectAll(value) {
    if (value) {
      _.each(this.models.lists.available, (item) => {
        this.models.lists.showing.push(item);
      });

      this.models.lists.available = [];
    } else {
      _.each(this.models.lists.showing, (item) => {
        this.models.lists.available.push(item);
      });

      this.models.lists.showing = [];
    }
  }

  save() {
    this.isSaving = true;
    // let dashboardItemUserRequest = [];

    // // We assign the displayOrder
    // for (let i = 0; i < this.models.lists.showing.length; i++) {
    //   dashboardItemUserRequest.push({
    //     dashboardItem: this.models.lists.showing[i],
    //     order: i
    //   })

    //   this.models.lists.showing[i].order = i;
    //   this.models.lists.showing[i].displayOrder = i;
    // }

    this.HomeService.saveDashboard(this.models.lists.showing)
      .then((response) => {
        // this.HomeService.saveDashboard(dashboardItemUserRequest).then((response) => {
        this.modalInstance.close(response);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('homeSettingsView', {
    templateUrl: 'views/home/homeSettings.view.html',
    controller: HomeSettingsController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
