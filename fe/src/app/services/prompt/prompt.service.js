;(() => {

class PromptService {
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open({ text = '', title = 'Prompt', confirmButtonText = 'Ok', cancelButtonText = 'Cancel', size = '', keyboard = true, backdrop = 'static', inputs = [], selects = [] }) {

    if (!_.isArray(inputs)) {
      console.error('"inputs" must be an array.');
      return;
    }

    if (!_.isArray(selects)) {
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
        confirmButtonText: () => confirmButtonText,
        cancelButtonText: () => cancelButtonText,
        inputs: () => inputs,
        selects: () => selects,
        isCollapsable: () => size.indexOf('compose') > -1
      }
    });

    return modalInstance.result;
  }
};

class PromptController {
  constructor($uibModalInstance, text, title, confirmButtonText, cancelButtonText, inputs, selects, isCollapsable) {
    this.isCollapsable = isCollapsable;
    
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
      step: 'any',
      pattern: null,
      petternErrorMessage: 'The structure of the field is wrong.',
      required: true,
      extraInputClasses: '',
      extraLabelClasses: '',
      compareTo: null,
    }

    this.selectOptions = {
      label: null,
      map: null,
      placeholder: null,
      value: null,
      required: true,
      extraInputClasses: '',
      extraLabelClasses: '',
      compareTo: null,
      idField: 'id',
      nameField: 'name',
      data: []
    }

    for (let i = 0; i < inputs.length; i++) {
      inputs[i] = this.getInput(inputs[i]);
      if (_.isEmpty(inputs[i].map)) {
        inputs[i].map = i;
      }
    }

    for (let i = 0; i < selects.length; i++) {
      selects[i] = this.getSelect(selects[i]);
      if (_.isEmpty(selects[i].map)) {
        selects[i].map = i;
      }
    }

    this.$uibModalInstance = $uibModalInstance;
    this.text = text;
    this.title = title;
    this.confirmButtonText = confirmButtonText;
    this.cancelButtonText = cancelButtonText;
    this.inputs = inputs;
    this.selects = selects;
  }

  getInput(opts) {
    return _.defaults({}, opts, _.clone(this.options));
  }

  getSelect(opts) {
    return _.defaults({}, opts, _.clone(this.selectOptions));
  }

  ok() {
    let r = {
      length: 0
    };

    for (let i = 0; i < this.inputs.length; i++) {
      r[this.inputs[i].map] = this.inputs[i].value;
      r.length++;
    }

    for (let i = 0; i < this.selects.length; i++) {
      if (_.isNull(this.selects[i].idField) && !_.isObject(this.selects[i].value)) {
        r[this.selects[i].map] = JSON.parse(this.selects[i].value);
      }
      else {
        r[this.selects[i].map] = this.selects[i].value;
      }

      r.length++;
    }

    r = r.length > 1 ? r : r[0];

    if (_.isObject(r)) {
      delete r.length;
    }

    this.$uibModalInstance.close(r);
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


