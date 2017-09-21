;(() => {

class DrillingParametersNewController {
  constructor(Auth, DrillingParameters ) {
    this.session = Auth.getSession();
    this.DrillingParameters = DrillingParameters;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new  this.DrillingParameters({});

    if (!_.isEmpty(this.resolve.activity.drillingParameters)) {
      this.data = new this.DrillingParameters(this.resolve.activity.drillingParameters);
    }
  }

  ok() {
    this.modalInstance.close(this.data.postPayload());
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('drillingParametersNew', {
    templateUrl: 'views/activities/drillingParameters/drillingParameters.html',
    controller: DrillingParametersNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
