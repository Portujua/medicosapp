;(() => {

class ChartDayVsDepthController {
  constructor(JobService, $filter) {
    this.JobService = JobService;
    this.$filter = $filter;
    
    this.total = 0;
    this.labels = [];
    this.data = [[]];
    this.colors = [{
      backgroundColor: 'rgba(247,70,74,1)',
      borderColor: 'rgba(247,70,74,1)',
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
            return `${$filter('number')(item.yLabel)}"`;
          }
        }
      },
      elements: {
        line: {
          tension: 0,
          borderWidth: 3,
          fill: false,
        },
        point: {
          radius: 4,
        }
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
            labelString: 'Feet',
          },
          type: 'linear',
          display: true,
          // position: 'left',
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            reverse: true,
          },
        }]
      }
    };
  }

  $onInit() {
    this.loadingPromise = this.load()
  }

  load() {
    return this.JobService.dailyDepth(this.jobId).then((response) => {
      let lastDepth = 0;

      for (let i = 0; i < response.data.length; i++) {
        this.labels.push(i.toString());
        this.data[0].push(lastDepth);
        lastDepth += response.data[i].footage;
        this.total = this.data[0][i];
      }
    })
  }
}

angular.module('app')
  .controller('ChartDayVsDepthController', ChartDayVsDepthController);

})();
