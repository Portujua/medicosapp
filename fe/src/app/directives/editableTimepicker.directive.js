angular.module('xeditable')
  .directive('editableTimepicker', (editableDirectiveFactory) => {
    return editableDirectiveFactory({
      directiveName : 'editableTimepicker',
      inputTpl : '<div uib-timepicker show-meridian="false" show-spinners="false"><div>'
    });
  });
