;(() => {

class SurveysBulkController {
  constructor(Auth, SurveyService, Survey, $scope, $timeout, PromptService, JobService) {
    this.session = Auth.getSession();
    this.SurveyService = SurveyService;
    this.Survey = Survey;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.PromptService = PromptService;
    this.JobService = JobService;
  }

  $onInit() {
    this.surveys = [];

    if (!_.isEmpty(this.resolve.job)) {
      this.job = angular.copy(this.resolve.job);
    }
  }

  ok() {
    this.isSaving = true;

    let surveys = _.filter(this.surveys, (value) => value.measuredDepth >= this.resolve.wellbore.tieInDepth);
    // Mapping
    surveys = _.map(surveys, (value) => {
      return {
        measuredDepth: value.measuredDepth,
        inclination: value.inclination,
        azimuth: value.azimuth,
        holeDepth: value.holeDepth,
        job: { id: this.job.id },
        wellbore: { id: this.resolve.wellbore.id },
      };
    });

    this.loadingPromise = this.SurveyService.bulk(surveys)
      .then((response) => {
        // Close the modal
        this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }

  create() {
    this.PromptService.open({
      title: 'Insert Survey',
      confirmButtonText: 'Insert',
      size: 'sm',
      keyboard: true,
      backdrop: true,
      inputs: [
        {
          type: 'number',
          map: 'measuredDepth',
          label: 'Measured Depth',
          placeholder: 'Enter a value...',
          min: 0,
        },
        {
          type: 'number',
          map: 'inclination',
          label: 'Inclination',
          placeholder: 'Enter a value...',
        },
        {
          type: 'number',
          map: 'azimuth',
          label: 'Azimuth',
          placeholder: 'Enter a value...',
          min: 0,
          max: 360,
        },
        {
          type: 'number',
          map: 'holeDepth',
          label: 'Hole Depth',
          placeholder: 'Enter a value...',
          min: 0,
        },
      ]
    }).then((response) => {
      this.surveys.push(response);
      this.sort();
    });
  }

  processFile(file) {
    let fileReader = new FileReader();

    fileReader.onload = (ev) => {
      this.loadingPromise = this.$timeout(() => {
        this.isProcessed = false;
        this.SurveyService.processFile(ev.target.result)
          .then((response) => {
            this.surveys = response;
          }, (response) => { })
          .finally(() => {
            this.isProcessed = true;
          });
      }, 500);
      // To show loading message
      this.$scope.$apply();
    };

    if (file) {
      fileReader.readAsText(file, 'UTF-8');
    }
  }

  sort() {
    this.surveys = _.sortBy(this.surveys, (value) => value.measuredDepth);
    this.removeDuplicates();
  }

  remove(item, index) {
    if (index >= 0 && index < _.size(this.surveys)) {
      this.surveys.splice(index, 1);
    }
  }

  removeDuplicates() {
    this.loadingPromise = this.$timeout(() => {
      this.surveys = _.uniq(this.surveys, (value) => angular.toJson(value));
    }, 0);
  }

  download() {
    let file = new Blob(['sep=;\nMD;INC;AZM;HD;(DO NOT REMOVE THIS ROW)\n0;0;0;0'], { type: 'text/plain' });
    let downloadLink = document.createElement('a');
    downloadLink.download = 'example.csv';
    downloadLink.innerHTML = 'Download File';

    if (!window.webkitURL) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(file);
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(file);
        downloadLink.onclick = function(event) {
            document.body.removeChild(event.target);
        };
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }

  getJobs(keyword) {
    return this.JobService.getActives(null, ['+jobNumber'], { jobNumber: keyword })
      .then((response) => {
        return _.first(response.data, 10);
      }, (response) => { });
  }
}

angular.module('app')
  .component('surveysBulk', {
    templateUrl: 'views/surveys/surveys.bulk.html',
    controller: SurveysBulkController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
