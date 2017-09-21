;(() => {

class JobLocationController {
  constructor(ReportService, $timeout, TabManagerService, TimeUtil, DateUtil) {
    this.ReportService = ReportService;
    this.$timeout = $timeout;
    this.TabManagerService = TabManagerService;
    this.DateUtil = DateUtil;

    let today = new Date();
    let lastWeek = TimeUtil.subtractDuration(today, 1, 'week');
    
    this.statusArray = [
      { id: 'SETTING_UP', title: 'Setting Up' },
      { id: 'UPCOMING', title: 'Upcoming' },
      { id: 'ACTIVE', title: 'Active' },
      { id: 'FINISHED', title: 'Finished' },
      { id: 'CANCELED', title: 'Canceled' },
    ];

    this.query = {
      startDate: lastWeek,
      endDate: today,
      jobStatus: ''
    }
  }

  $onInit() {
    this.loadingPromise = this.load();
  }

  load() {
    // Save last search
    this.lastSearch = _.extend({ }, this.query);
    
    this.isLoading = this.ReportService.jobLocation({
      startDate: this.DateUtil.convertDatesToStrings(this.query.startDate),
      endDate: this.DateUtil.convertDatesToStrings(this.query.endDate),
      jobStatus: this.query.jobStatus
    }).then((response) => {
      this.jobs = response.data;
      this.markers = [];

      let totals = {
        latitude: 0.0,
        longitude: 0.0
      }

      let borders = {
        top: -90.0, // All opposites... Top here is really bottom
        bottom: 90.0,
        right: -180.0,
        left: 180.0
      }

      for (let i = 0; i < response.data.length; i++) {
        this.markers.push({
          position: [response.data[i].well.latitude, response.data[i].well.longitude],
          title: `${response.data[i].jobStatus} (Job #${response.data[i].jobNumber})`,
          icon: {
            url:'http://inkwellideas.com/wp-content/uploads/2010/05/oilwell.png',
            scaledSize:[30,30]
          }
        });

        // Borders to create a rectangle
        borders.top = parseFloat(response.data[i].well.latitude) > borders.top ? parseFloat(response.data[i].well.latitude) : borders.top;
        borders.bottom = parseFloat(response.data[i].well.latitude) < borders.bottom ? parseFloat(response.data[i].well.latitude) : borders.bottom;

        borders.right = parseFloat(response.data[i].well.longitude) > borders.right ? parseFloat(response.data[i].well.longitude) : borders.right;
        borders.left = parseFloat(response.data[i].well.longitude) < borders.left ? parseFloat(response.data[i].well.longitude) : borders.left;
      }

      // Calculate center
      this.center = [
        borders.bottom + Math.abs(Math.abs(borders.bottom) - Math.abs(borders.top)) / 2,
        borders.left + Math.abs(Math.abs(borders.left) - Math.abs(borders.right)) / 2
      ];

      // We move our borders to possitive quadrant
      // This to get rid of borders on any axis (a.k.a. value 0) causing the miscalculation of the area
      // Example: top: 10, bottom: 0, left: 10, right: 0
      // Area would be (10 + 0) * (10 + 0) = 100 when it's really (190 + 180) * (100 + 90) = 70300 :D
      let _borders = {
        top: borders.top + 90.0,
        bottom: borders.bottom + 90.0,
        left: borders.left + 180.0,
        right: borders.right + 180.0
      }
      let area = ((Math.abs(_borders.left) + Math.abs(_borders.right)) * (Math.abs(_borders.top) + Math.abs(_borders.bottom)));

      // console.log('Borders', borders);
      // console.log('Area:', area);

      if (this.markers.length === 1) {
        this.zoom = 10;
      }
      else if (area > 45000) {
        this.zoom = 1;
      }
      else if (area > 30000) {
        this.zoom = 3;
      }
      else {
        this.zoom = 10;
      }
      // End calculate center
    }).finally(() => {
      this.isLoading = false;
    })
  }

  clickMarker(sender, e) {
    // Here, 'this' isn't the controller, it's the marker object.
    // 'e' is an object with { index: Number, ctrl: obj } where 'index' is the marker index clicked and 'ctrl' is the HomeController
    e.ctrl.$timeout(() => {
      e.ctrl.TabManagerService.add({ title: this.data.jobs[e.index].jobNumber, component: 'jobsView', id: this.data.jobs[e.index].id });
    })
  }
}

angular.module('app')
  .component('jobLocationReport', {
    templateUrl: 'views/reports/jobLocation/jobLocation.html',
    controller: JobLocationController,
    controllerAs: '$ctrl'
  });

})();
