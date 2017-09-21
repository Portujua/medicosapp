;(() => {

class ChartDayVsCostController {
  constructor(JobService, $filter) {
    this.$filter = $filter;
    this.JobService = JobService;

    this.total = 0;
    this.labels = [];
    this.data = [[]];
    this.colors = [{
      backgroundColor: 'rgba(247,70,74,1)',
      borderColor: 'rgba(247,70,74,1)',
      hoverBackgroundColor: 'rgba(247,70,74,1)',
      hoverBorderColor: 'rgba(247,70,74,1)'
    }];

    this.options = {
      // title: {
      //   display: true,
      //   text: 'Days vs. Depth',
      // },
      tooltips: {
        callbacks: {
          title: function(items, data) {
            return `Day #${items[0].xLabel}`;
          },
          label: function(item, data) {
            return $filter('currency')(item.yLabel);
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
          },
        }]
      }
    };
  }

  $onInit() {
    this.loadingPromise = this.load();
  }

  load() {
    return this.JobService.dailyCosts(this.jobId).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        this.labels.push((i + 1).toString());
        this.data[0].push(response.data[i].dayCost);
        this.total += this.data[0][i];
      }
    })
  }
}

angular.module('app')
  .controller('ChartDayVsCostController', ChartDayVsCostController);

})();
