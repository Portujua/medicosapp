;(() => {

class SoldSuscriptionsController {
  constructor(AdminService, $filter, TimeUtil) {
    this.$filter = $filter;
    this.AdminService = AdminService;
    this.TimeUtil = TimeUtil;

    this.today = new Date();

    this.total = 0;
    this.labels = [];
    this.data = [[]];
    this.colors = [{
      backgroundColor: '#0c86a2',
      borderColor: '#085f73',
      hoverBackgroundColor: '#0c86a2',
      hoverBorderColor: '#085f73'
    }];
    this.series = [];

    this.options = {
      // title: {
      //   display: true,
      //   text: 'Days vs. Depth',
      // },
      tooltips: {
        callbacks: {
          title: function(items, data) {
            return `${items[0].xLabel}`;
          },
          label: function(item, data) {
            return $filter('currency')(item.yLabel, 'Bs. ');
          }
        }
      },
      elements: {

      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: false,
            labelString: 'Days',
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: false,
            labelString: '$',
          },
          type: 'linear',
          display: true,
          // position: 'left',
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            reverse: false,
          }
        }]
      }
    };
  }

  $onInit() {
    this.loadingPromise = this.load();
  }

  load() {
    let last = this.TimeUtil.subtractDuration(this.today, 1, 'week');

    for (let i = 0; i < 7; i++) {      
      last = this.TimeUtil.addDuration(last, 1, 'day');
      let n = Math.floor(Math.random() * 30000 + 20000);

      this.labels.push(this.$filter('date')(last, 'dd/MMM'));
      this.total += n;
      this.data[0].push(n);
    }
  }
}

angular.module('app')
  .controller('SoldSuscriptionsController', SoldSuscriptionsController);

})();
