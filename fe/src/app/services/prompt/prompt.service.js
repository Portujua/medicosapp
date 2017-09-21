;(() => {

class PromptService {
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open({ text = '', title = 'Prompt', comfirmButtonText = 'Ok', cancelButtonText = 'Cancel', size = '', keyboard = true, backdrop = 'static', inputs = [] }) {

    if (!_.isArray(inputs)) {
      console.error('"inputs" must be an array.');
      return;
    }

    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'prompt-title',
      ariaDescribedBy: 'prompt-body',
      templateUrl: 'app/services/prompt/prompt.html',
      controller: 'PromptController',
      controllerAs: '$ctrl',
      keyboard: keyboard, // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: backdrop, // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: size,
      resolve: {
        text: () => text,
        title: () => title,
        comfirmButtonText: () => comfirmButtonText,
        cancelButtonText: () => cancelButtonText,
        inputs: () => inputs
      }
    });

    return modalInstance.result;
  }
};

class PromptController {
  constructor($uibModalInstance, text, title, comfirmButtonText, cancelButtonText, inputs) {
    this.options = {
      label: null,
      type: 'text',
      map: null,
      placeholder: null,
      value: null,
      name: null,
      maxlength: null,
      minlength: 0,
      max: null,
      min: null,
      step: 1,
      pattern: null,
      petternErrorMessage: 'The structure of the field is wrong.',
      required: true,
      extraInputClasses: '',
      extraLabelClasses: '',
      compareTo: null,
    }

    for (let i = 0; i < inputs.length; i++) {
      inputs[i] = this.getInput(inputs[i]);
      if (_.isEmpty(inputs[i].map)) {
        inputs[i].map = i;
      }
    }

    this.$uibModalInstance = $uibModalInstance;
    this.text = text;
    this.title = title;
    this.comfirmButtonText = comfirmButtonText;
    this.cancelButtonText = cancelButtonText;
    this.inputs = inputs;
  }

  getInput(opts) {
    return _.defaults({}, opts, _.clone(this.options));
  }

  ok() {
    let r = {
      length: 0
    };

    for (let i = 0; i < this.inputs.length; i++) {
      r[this.inputs[i].map] = this.inputs[i].value;
      r.length++;
    }

    this.$uibModalInstance.close(r.length > 1 ? r : r[0]);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}


angular.module('app')
  .controller('PromptController', PromptController);

angular.module('app')
  .service('PromptService', PromptService);

})();


