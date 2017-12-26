;(() => {

class SoldSuscriptionsController {
  constructor(AdminService, $filter, TimeUtil) {
    this.$filter = $filter;
    this.AdminService = AdminService;
    this.TimeUtil = TimeUtil;

    this.today = new Date();

    this.total = 0;
    this.labels = [];
    this.chartData = [[]];
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
            labelString: 'Días',
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
    this.load();
    // if (_.isUndefined(this.data)) {
    //   this.loadingPromise = this.load();
    // }
    // else {
    //   this.processData();
    // }
  }

  load() {
    // return this.MercadoPago.summary().then((response) => {
    //   this.data = response.data.thisMonth.results;
    //   this.processData();
    // })
    let last = this.TimeUtil.subtractDuration(this.today, 1, 'week');

    for (let i = 0; i < 7; i++) {      
      last = this.TimeUtil.addDuration(last, 1, 'day');
      let n = Math.floor(Math.random() * 30000 + 20000);

      this.labels.push(this.$filter('date')(last, 'dd/MMM'));
      this.total += n;
      this.chartData[0].push(n);
    }
  }

  // processData() {
  //   _.each(this.data, (r) => {
  //     this.labels.push(this.$filter('date')(r.date_created, 'dd/MMM'))
  //     this.total += r.amount;
  //     this.chartData[0].push(r.amount);
  //   })
  // }
}

angular.module('app')
  .controller('SoldSuscriptionsController', SoldSuscriptionsController);

})();
