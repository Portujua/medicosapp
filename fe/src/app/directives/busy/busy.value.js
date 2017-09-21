angular.module('app')
  .value('cgBusyDefaults', {
    message: 'Loading...',
    backdrop: true,
    templateUrl: 'app/directives/busy/busy.html',
    delay: 0,
    minDuration: 0,
    wrapperClass: 'cg-busy cg-busy-animation',
  });
