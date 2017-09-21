;(() => {

class PrintAreaController {
  constructor($scope, PrintAreaService) {
    this.$scope = $scope;
    this.keepAttr = [];
    this.PrintAreaService = PrintAreaService;

    this.keepAttr.push('class');
    this.keepAttr.push('id');
    this.keepAttr.push('style');
    this.keepAttr.push('on');

    this.headElements = '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
  }

  print() {
    let close = false;
    let print = '';
    angular.forEach(this.$scope.print, function(value, key) {
      print += `${(print.length > 0 ? ',' : '')}div#${value}`;
    });

    let options = { mode: 'iframe', popClose: close, extraCss: '', retainAttr: this.retanAttr, extraHead: this.headElements };
    $(print).printArea(options, this.PrintAreaService);
  }

}

angular.module('app')
  .controller('PrintAreaController', PrintAreaController);

})();
