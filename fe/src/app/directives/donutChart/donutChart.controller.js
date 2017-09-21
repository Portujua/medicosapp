;(() => {

class DonutsChartController {
  constructor($scope, CommentsService, ChartsService) {
    this.$scope = $scope;
    this.ChartsService = ChartsService;
   

  }

  $onInit(){
   
     this.chartConfig1 = this.ChartsService.getDonut(180);
     this.chartConfig1.series = [
      {
        name: 'Time',
        innerSize: '50%',
        data: this.$scope.config,
      },
    ];


  }

  open() {
    this.CommentsService.open(this.$scope.id)
      .then((response) => {
        this.count = this.count + response;
      });
  }
}

angular.module('app')
  .controller('DonutsChartController', DonutsChartController);

})();
