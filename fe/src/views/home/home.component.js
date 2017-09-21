;(() => {

class HomeController {
  constructor(HomeService, Report, Auth) {
    this.HomeService = HomeService;
    this.Report = Report;
    this.session = Auth.getSession();

    this.today = new Date();

    // This will hold my graphs settings to display
    this.myDashboard = [];

    // This is the base dashboard with all the possible options
    this.baseDashboard = this.getBaseDashboard();
  }

  $onInit() {
    this.load();
  }

  load() {
    this.baseDashboard = this.getBaseDashboard();
    this.myDashboard = [];

    this.HomeService.listMyDashboardItems().then((response) => {
      this.myDashboardItems = response.data;

      for (let i = 0; i < response.data.length; i++) {
        for (let k = 0; k < this.baseDashboard.length; k++) {
          if (response.data[i].title === this.baseDashboard[k].search) {
            this.baseDashboard[k].active = true;

            this.myDashboard.push(this.baseDashboard[k]);
          }
        }
      }

      this.isLoading = this.HomeService.getSummary().then((response) => {
        this.summary = response.data;
      })
    });
  }

  getBaseDashboard() {
    return [
      new this.Report({ component: 'jobLocationReport', search: 'Active Jobs', permission: 'job_locations' }),
      new this.Report({ component: 'jobDepthReport', search: 'Active Jobs', permission: 'active_jobs' }),
      new this.Report({ component: 'jobHistoryReport', search: 'Jobs per Day', permission: 'jobs_per_day' }),
      new this.Report({ component: 'bhaFailuresReport', search: 'BHA Failures', permission: 'bha_failures' }),
      new this.Report({ component: 'ropReport', search: 'ROP Performance', permission: 'rop_performance' })
    ];
  }

  showSummary() {
    if (!this.myDashboardItems) {
      return false; 
    }
    
    for (let i = 0; i < this.myDashboardItems.length; i++) {
      if (this.myDashboardItems[i].title === 'Summary') {
        return this.session.can('summary', 'get');
      }
    }

    return false;
  }

  openSettings() {
    this.HomeService.openSettings()
      .then((response) => {
        this.load();
      });
  }
}

angular.module('app')
  .component('home', {
    templateUrl: 'views/home/home.html',
    controller: HomeController,
    controllerAs: '$ctrl',
    bindings: {
      tabId: '@'
    }
  });

})();
